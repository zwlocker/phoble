import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import Navbuttons from "../Home/Navbuttons/Navbuttons";
import Grid from "@mui/material/Grid";
import { getSongs } from "../../api";
import Box from "@mui/material/Box";

const SongGrid = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongs();
      setSongs(data || []);
    };
    fetchSongs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Navbuttons />
      <Grid container spacing={5} sx={{ textAlign: "center" }}>
        {songs.map((song) => (
          <Grid
            size={4}
            key={song._id}
            className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10 max-h-101"
          >
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
