import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import Navbuttons from "../SongPage/Navbuttons/Navbuttons";
import Grid from "@mui/material/Grid";
import { getSongs } from "../../api";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

/*
 * This is the SongGrid component. It determines the layout of the Past Songs page, which can be accessed
 * through the Navbuttons component. Each song card shows the date the song was added, the album cover for the song, the song name,
 * and the artist name. Clicking on a song card takes the user to the SongPage component for that song.
 *
 * This component calls the getSongs function in order to retrieve all songs from the database so that each song can
 * be displayed in the grid, as well as the useNavigate function in order to navigate to a new page when clicking on
 * a song card.
 */

const SongGrid = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongs();
      setSongs(data || []);
    };
    fetchSongs();
  }, []);

  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className="mb-10">
      <Navbuttons />
      <Grid container spacing={5} sx={{ textAlign: "center" }}>
        {songs.map((song, index) => (
          <Grid
            size={{ sm: 6, md: 4, xs: 12 }}
            key={song._id}
            className="bg-white/8 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10 max-h-110 cursor-pointer transform transition-transform duration-300 hover:-translate-y-3 hover:border-pink-300"
            onClick={() =>
              index === 0 ? navigate("/") : navigate(`/song/${song.trackId}`)
            }
          >
            <h3 className="mb-3 text-md  font-bold">
              {new Date(song.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box component="img" src={song.cover} sx={{ height: 250 }} />
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mt-3">
                {song.name}
              </h2>
              <h3 className="text-lg text-purple-300 font-semibold mb-6">
                {song.artist}
              </h3>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SongGrid;
