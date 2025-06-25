import React from "react";
import { getLatestSong } from "../../actions/songs";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let song = await getLatestSong();
const Home = () => {
  return (
    <Container maxWidth="sm" className="text-white text-center">
      <Typography variant="h1">Phoble</Typography>

      <Box component="img" src={song.cover} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h2">{song.name}</Typography>
        <Typography variant="h5">{song.artist}</Typography>
      </Box>

      <Typography variant="h3">Comments</Typography>
      <Typography variant="h6">This song is really neat.</Typography>
      <Typography variant="h6">So good!</Typography>
    </Container>
  );
};

export default Home;
