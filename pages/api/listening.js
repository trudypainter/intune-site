import { getUserTopArtists, getUserTopSongs } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  // console.log("🟠 got api call");

  //   const {
  //     token: { accessToken, email },
  //   } = await getSession({ req });

  const bodyJSON = JSON.parse(req.body);
  const accessToken = bodyJSON["token"];
  const reqEmail = bodyJSON["email"];

  // console.log("🟠 got access token", accessToken);
  // console.log("🟠 got email ", reqEmail);

  // add to user's listening json
  let userPrisma = await prisma.user.findUnique({
    where: {
      email: reqEmail,
    },
  });
  console.log(" ⭐️", userPrisma);

  if (userPrisma && userPrisma.listening) {
    // return user listening data
    res.status(200).json(userPrisma.listening);
  }
  //   parallel promises
  const shortSongPromise = getUserTopSongs(accessToken, "short_term");
  const medSongPromise = getUserTopSongs(accessToken, "medium_term");
  const longSongPromise = getUserTopSongs(accessToken, "long_term");

  const shortArtistPromise = getUserTopArtists(accessToken, "short_term");
  const medArtistPromise = getUserTopArtists(accessToken, "medium_term");
  const longArtistPromise = getUserTopArtists(accessToken, "long_term");

  // await all of the promises
  const shortSongResponse = await shortSongPromise;
  const medSongResponse = await medSongPromise;
  const longSongResponse = await longSongPromise;

  const shortArtistResonse = await shortArtistPromise;
  const mediumArtistResponse = await medArtistPromise;
  const longArtistResponse = await longArtistPromise;

  // convert all to json
  const shortSongJSON = await shortSongResponse.json();
  const mediumSongJSON = await medSongResponse.json();
  const longSongJSON = await longSongResponse.json();

  const shortArtistJSON = await shortArtistResonse.json();
  const mediumArtistJSON = await mediumArtistResponse.json();
  const longArtistJSON = await longArtistResponse.json();

  // create json of listeing data
  const listeningDict = {
    artists: {
      short_term: shortArtistJSON["items"],
      medium_term: mediumArtistJSON["items"],
      long_term: longArtistJSON["items"],
    },
    tracks: {
      short_term: shortSongJSON["items"],
      medium_term: mediumSongJSON["items"],
      long_term: longSongJSON["items"],
    },
  };

  if (!userPrisma || !userPrisma.listening) {
    // return user listening data
    res.status(200).json(listeningDict);
  }

  // add to user's listening json
  userPrisma = await prisma.user.update({
    where: {
      email: reqEmail,
    },
    data: {
      listening: listeningDict,
    },
  });
  console.log(" ⭐️ updated ", userPrisma);
};

export default handler;
