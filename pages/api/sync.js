import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server =
  process.env.NODE_ENV === "production"
    ? "https://in-tune.vercel.app/"
    : "http://localhost:3000/";

const getSync = async (res, syncId) => {
  // find the sync object that matches both user 1 and user 2
  // OR get the sync object from the id
  const sync = await prisma.sync.findUnique({
    where: {
      id: syncId,
    },
    include: {
      requester: true,
      receiver: true,
    },
  });

  console.log(sync);

  if (sync) {
    return res.status(200).json(sync);
  }
  return res.status(404).json({ failure: "Sync does not exist" });
};

const getSharedArtists = (reqListening, recListening) => {
  let allRecArtists = [
    ...recListening["artists"]["short_term"],
    ...recListening["artists"]["medium_term"],
    ...recListening["artists"]["long_term"],
  ];

  let allReqArtists = [
    ...reqListening["artists"]["short_term"],
    ...reqListening["artists"]["medium_term"],
    ...reqListening["artists"]["long_term"],
  ];

  const recArtistIds = allRecArtists.map((track) => track["name"]);
  let intersection = allReqArtists.filter((reqArtist) =>
    recArtistIds.includes(reqArtist["name"])
  );

  // remove duplicates
  const uniqueIds = [];
  const setArtists = intersection.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.name);
    if (!isDuplicate) {
      uniqueIds.push(element.name);
      return true;
    }
    return false;
  });

  console.log("⭐️ARTISTS", setArtists);

  return setArtists;
};

const getSharedTracks = (reqListening, recListening) => {
  let allRecTracks = [
    ...recListening["tracks"]["short_term"],
    ...recListening["tracks"]["medium_term"],
    ...recListening["tracks"]["long_term"],
  ];

  let allReqTracks = [
    ...reqListening["tracks"]["short_term"],
    ...reqListening["tracks"]["medium_term"],
    ...reqListening["tracks"]["long_term"],
  ];

  const recTrackIds = allRecTracks.map((track) => track["title"]);
  let intersection = allReqTracks.filter((reqTrack) =>
    recTrackIds.includes(reqTrack["title"])
  );

  // remove duplicates
  const uniqueIds = [];
  const setTracks = intersection.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.title);
    if (!isDuplicate) {
      uniqueIds.push(element.title);
      return true;
    }
    return false;
  });

  console.log("⭐️TRACKS", setTracks);
  return setTracks;
};

const getSharedGenres = (reqListening, recListening) => {
  let allRecGenres = [
    ...recListening["artists"]["short_term"],
    ...recListening["artists"]["medium_term"],
    ...recListening["artists"]["long_term"],
  ]
    .map((artist) => artist["genres"])
    .flat();

  let allReqGenres = [
    ...reqListening["artists"]["short_term"],
    ...reqListening["artists"]["medium_term"],
    ...reqListening["artists"]["long_term"],
  ]
    .map((artist) => artist["genres"])
    .flat();

  let uniqueRecGenres = [...new Set(allRecGenres)];
  let uniqueReqGenres = [...new Set(allReqGenres)];
  //   console.log(uniqueRecGenres);

  let intersection = uniqueRecGenres.filter((recGenre) =>
    uniqueReqGenres.includes(recGenre)
  );

  console.log(intersection);
  return intersection;
};

const k = 2;
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z / k));
}
const getCompatibility = (sharedArtists, sharedTracks) => {
  let artistPercent = sharedArtists.length / 150;
  let trackPercent = sharedTracks.length / 150;

  return parseInt(sigmoid((artistPercent + trackPercent) * 8) * 100);
};

const newSync = async (res, reqAccessToken, reqEmail, receiverEmail) => {
  //   console.log("GOT NEW SYNC OBJECT");
  // get requester info
  // (whoever is logged in with cookies)

  let userObjs = await prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            equals: reqEmail,
          },
        },
        {
          email: {
            equals: receiverEmail,
          },
        },
      ],
    },
  });

  // get receiver info
  // (user object that correlates to the slug)
  let receiverObj = userObjs[0];
  let requesterObj = userObjs[1];

  console.log("⚪️", receiverObj);
  console.log("⚪️", requesterObj);

  if (!receiverObj.listening) {
    console.log("⭐️ GETTING THAT NEW LISTENING");
    fetch(`${server}api/listening`, {
      method: "POST",
      body: JSON.stringify({
        token: reqAccessToken,
        email: reqEmail,
      }),
    }).then((response) =>
      response.json().then((userData) => {
        console.log("🍇 user data", userData);
        receiverObj = userData;
        makeTheActualSync(res, requesterObj, receiverObj);
      })
    );
  } else {
    makeTheActualSync(res, requesterObj, receiverObj);
  }
};

const makeTheActualSync = async (res, requesterObj, receiverObj) => {
  // check if a sync already exists
  let a = requesterObj.email;
  let b = receiverObj.email;
  console.log("🟪 looking for ", a, b);
  let potSyncObj = await prisma.sync.findFirst({
    where: {
      OR: [
        {
          requesterEmail: a,
          receiverEmail: b,
        },
        {
          requesterEmail: b,
          receiverEmail: a,
        },
      ],
    },
  });
  if (potSyncObj) {
    console.log("⭐️ A SYNC OBJ ALREADY EXISTED");
    res.status(200).json(potSyncObj);
    return;
  }

  let sharedArtists = getSharedArtists(
    receiverObj.listening,
    requesterObj.listening
  );
  let sharedTracks = getSharedTracks(
    receiverObj.listening,
    requesterObj.listening
  );

  let compatibility = getCompatibility(sharedArtists, sharedTracks);
  console.log("🟢 SIGMOID", compatibility);

  let syncItem = {
    receiverEmail: receiverObj.email,
    requesterEmail: requesterObj.email,
    compatibility: compatibility,

    sharedArtists: {
      items: sharedArtists,
    },
    sharedTracks: {
      items: sharedTracks,
    },
  };

  console.log("🟣 SYNC ITEM: ", syncItem);

  const syncObj = await prisma.Sync.create({
    data: syncItem,
  });

  console.log("⭐️ CREATED NEW SYNC OBJ", syncObj);
  res.status(200).json(syncObj);
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const bodyJSON = JSON.parse(req.body);
    const reqEmail = bodyJSON["requester"]["session"]["user"]["email"];
    const reqAccessToken = bodyJSON["requester"]["token"]["accessToken"];
    const receiverUserObj = bodyJSON["receiver"];
    newSync(res, reqAccessToken, reqEmail, receiverUserObj);
  } else if (req.method === "GET") {
    const query = req.query;
    const { id } = query;
    console.log("⭐️GET, ", id);
    getSync(res, id);
  }
};

export default handler;
