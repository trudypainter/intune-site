import { getUserTopArtists, getUserTopSongs } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const handler = async (req, res) => {
  console.log("🟠 got api call");

  const {
    token: { accessToken, email },
  } = await getSession({ req });

  console.log("🟠 got session", accessToken);
  // parallel promises

  const shortSongPromise = getUserTopSongs(accessToken, "short_term");
  const medSongPromise = getUserTopSongs(accessToken, "medium_term");
  const longSongPromise = getUserTopSongs(accessToken, "long_term");

  const shortArtistPromise = getUserTopArtists(accessToken, "short_term");
  const medArtistPromise = getUserTopArtists(accessToken, "medium_term");
  const longArtistPromise = getUserTopArtists(accessToken, "long_term");

  console.log("🟠 awaiting promises...");
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

  return res.status(200).json({
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
  });
};

export default handler;
