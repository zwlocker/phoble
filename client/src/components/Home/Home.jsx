import React, { useEffect, useState } from "react";
import { getLatest, addComment } from "../../api/index";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Player from "../Player/Player";
import Button from "@mui/material/Button";
import Comment from "./Comment/Comment";
import CommentSection from "./CommentSection/CommentSection";

const Home = () => {
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const data = await getLatest();
      setSong(data);
      setComments(data.comments || []);
    };
    fetchSong();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addComment(message);
    setComments((prev) => [...prev, res]);
    setMessage("");
  };

  if (!song) return <Typography>Loading...</Typography>;

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
          <CommentSection comments={comments} />
          <form onSubmit={handleSubmit}>
            <TextField
              value={message}
              placeholder="Enter comment"
              autoComplete="off"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
          <Player id={song.trackId} />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
