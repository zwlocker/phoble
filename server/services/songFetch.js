import Song from "../models/song.js";

// Queries 50 songs from Spotify's API and selects one to save to the DB
export async function getData(queryString, token, dayCounter) {
  const url = queryString;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Unable to query tracks. Response status: ${response.status}`
      );
    }
    const json = await response.json();

    // Iterates through all 50 tracks in the query
    for (let track of json.tracks.items) {
      const { name, artists, popularity, id } = track;
      const image = track.album.images[0].url;
      const artist = artists[0].name;

      let save = false;
      let exists = false;

      const songDB = await Song.find({});
      // Ensures song does not already exist
      for (let song of songDB) {
        if (
          (artist === song.artist && name === song.name) ||
          id === song.trackId
        ) {
          exists = true;
        }
      }

      if (dayCounter >= 1 && dayCounter < 4) {
        // Handles popularity filtering
        if (popularity >= 90) {
          save = true;
        }
      } else if (dayCounter === 4 || dayCounter === 5) {
        // Middle range
        if (popularity >= 30 && popularity < 90) {
          save = true;
        }
      } else if (dayCounter === 6 || dayCounter === 0) {
        // Only least popular songs
        if (popularity >= 0 && popularity < 30) {
          save = true;
        }
      }

      if (save && !exists) {
        const song = new Song({
          // Constructs Song model to save
          name: name,
          artist: artist,
          trackId: id,
          comments: [],
          cover: image,
        });
        saveSong(song);
        return;
      }
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Returns the constructed URI to query Spotify
export async function getURI(dayCounter) {
  const genres = ["pop", "rock", "indie", "indie-pop", "jazz", "country"]; // Add more genres
  const letters = ["a", "e", "t", "o", "i"];

  let spotifyURI = "https://api.spotify.com/v1/search?";
  let queryString = "genre%3A" + genres[Math.floor(Math.random() * 3)];

  if (dayCounter >= 1 && dayCounter < 4) {
    // Day is Monday, Tuesday, or Wednesday
    // Most popular search
    queryString = "q=" + queryString;
  } else if (dayCounter === 4 || dayCounter === 5) {
    // Day is Thursday or Friday
    // More niche search
    queryString =
      "q=" + letters[Math.floor(Math.random() * 5)] + "%20" + queryString;
  } else if (dayCounter === 6 || dayCounter === 0) {
    // Day is Saturday or Sunday
    // Least popular search
    queryString = "q=tag:hipster%20" + queryString;
  }

  queryString =
    spotifyURI + queryString + "&type=track&market=US&limit=50&offset=0";

  return queryString;
}

// Saves the passed song into the DB
async function saveSong(song) {
  try {
    await song.save();
    console.log("Song added successfully.");
  } catch (error) {
    console.log("Error in saving song to DB: ", error.message);
  }
}
