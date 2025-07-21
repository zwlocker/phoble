import { getData, getURI } from "./songFetch.js";
import { getAccessToken } from "./spotifyAuth.js";

export async function addSong() {
  const d = new Date();
  let day = d.getDay();

  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const token = await getAccessToken(id, secret);
  const uri = await getURI(day);

  await getData(uri, token, day);
}
