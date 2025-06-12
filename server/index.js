import dotenv from "dotenv";
import { getData, getURI } from "./services/songFetch.js";
import { getAccessToken } from "./services/spotifyAuth.js";
import { connectDB } from "./config/db.js";

dotenv.config();

async function main() {
  connectDB();

  const d = new Date();
  let day = d.getDay();

  const id = process.env.CLIENT_ID;
  const secret = process.env.CLIENT_SECRET;

  const token = await getAccessToken(id, secret);
  const uri = await getURI(day);

  await getData(uri, token, day);
  console.log("Song added successfully.");
}

main();
