import React from "react";
import { getLatestSong } from "../../actions/songs";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Player from "../Player/Player";

let song = await getLatestSong();

const Home = () => {
  return (
    <Container maxWidth="lg" className="text-white">
      <Typography variant="h1">Phoble</Typography>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box>
          <Box component="img" src={song.cover} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2">{song.name}</Typography>
            <Typography variant="h5">{song.artist}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Comments</Typography>

          <TextField placeholder="Enter comment"></TextField>
          <Player id={song.trackId} />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
