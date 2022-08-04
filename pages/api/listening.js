import { getUserTopArtists, getUserTopSongs } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const parseSongs = (songJson) => {
  let longItems = songJson.items;
  let newItems = [];

  for (let item of longItems) {
    let shortenedItem = {
      image: item["album"]["images"]["0"]["url"],
      title: item["name"],
      artist: item["artists"][0]["name"],
      album: item["album"]["name"],
    };

    newItems = [...newItems, shortenedItem];
  }
  return newItems;
};

const parseArtists = (songJson) => {
  let longItems = songJson.items;
  let newItems = [];

  for (let item of longItems) {
    let shortenedItem = {
      image: item["images"]["0"]["url"],
      name: item["name"],
      genres: item["genres"],
    };

    newItems = [...newItems, shortenedItem];
  }
  return newItems;
};

const handler = async (req, res) => {
  const bodyJSON = JSON.parse(req.body);
  const accessToken = bodyJSON["token"];
  const reqEmail = bodyJSON["email"];

  console.log(reqEmail);

  // add to user's listening json
  let userPrisma = await prisma.user.findUnique({
    where: {
      email: reqEmail,
    },
    include: {
      syncReceived: {
        include: {
          receiver: true,
          requester: true,
        },
      },
      syncRequested: {
        include: {
          receiver: true,
          requester: true,
        },
      },
      accounts: {
        include: {
          user: true,
        },
      },
    },
  });

  if (userPrisma.listening) {
    // return user listening data
    userPrisma.accounts = userPrisma.accounts[0]["providerAccountId"];
    res.status(200).json(userPrisma);
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

  // only save relevant listening data
  // album cover, song name, artist name, album

  // create json of listeing data
  const listeningDict = {
    artists: {
      short_term: parseArtists(shortArtistJSON),
      medium_term: parseArtists(mediumArtistJSON),
      long_term: parseArtists(longArtistJSON),
    },
    tracks: {
      short_term: parseSongs(shortSongJSON),
      medium_term: parseSongs(mediumSongJSON),
      long_term: parseSongs(longSongJSON),
    },
  };

  // add to user's listening json
  let userPrismaUpdate = await prisma.user.update({
    where: {
      email: reqEmail,
    },
    data: {
      listening: listeningDict,
    },
  });

  if (!userPrisma || !userPrisma.listening) {
    // return user listening data
    res.status(200).json(userPrismaUpdate);
  }

  console.log(" ⭐️ updated ", userPrismaUpdate);
};

export default handler;
