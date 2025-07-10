import React, { useEffect, useState } from "react";
import { getLatest } from "../../api/index";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Player from "../Player/Player";
import CommentSection from "./CommentSection/CommentSection";
import CommentIcon from "@mui/icons-material/Comment";
import Navbuttons from "./Navbuttons/Navbuttons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [song, setSong] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      const data = await getLatest();
      setSong(data);
    };
    fetchSong();
  }, []);

  if (!song) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Navbuttons />

      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10">
        <Box sx={{ my: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={song.cover}
              sx={{
                height: 400,
                mb: 4,
              }}
            />
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {song.name}
            </h2>
            <h3 className="text-2xl text-purple-300 font-semibold mb-6">
              {song.artist}
            </h3>
          </Box>
          <div className="flex items-center gap-2 mb-6">
            <CommentIcon className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">
              {song.comments.length} comments
            </span>
          </div>

          <Player id={song.trackId} sx={{ marginTop: 4 }} />
        </Box>
      </div>
      <CommentSection songId={song.trackId} />
    </Container>
  );
};

export default Home;
