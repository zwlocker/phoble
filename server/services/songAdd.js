import { getData, getURI } from "./songFetch.js";
import { getAccessToken } from "./spotifyAuth.js";

/*
 * Daily song addition service
 * Fetches and processes a song based on the current day of the week by
 *
 * 1. Determines current day (0-6, Sunday-Saturday)
 * 2. Authenticates with Spotify API
 * 3. Gets appropriate song URI for the day
 * 4. Fetches and stores song data
 */
export async function addSong() {
  const d = new Date();
  let day = d.getDay();

  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;
  const token = await getAccessToken(id, secret);
  const uri = await getURI(day);

  await getData(uri, token, day);
}
