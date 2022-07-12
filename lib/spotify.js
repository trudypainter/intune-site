const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

const TOP_ARTISTS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=";

const TOP_SONGS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=";

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  console.log("🟠 got to lib file.....");
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserTopSongs = async (refresh_token, range) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(TOP_SONGS_ENDPOINT + range, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserTopArtists = async (refresh_token, range) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(TOP_ARTISTS_ENDPOINT + range, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
