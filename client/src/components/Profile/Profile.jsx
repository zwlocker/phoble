import React from "react";
import Navbuttons from "../SongPage/Navbuttons/Navbuttons";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  if (!user) {
    return null;
  }
  const comments = user.pastComments;
  console.log(comments);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Navbuttons />
      <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Hello, {user.username} </h1>
        <h2 className="text-center text-2xl font-semibold">
          Here's what we know about you...
        </h2>
        <p>GoogleID: {user.googleId}</p>
        <p>
          Date joined:{" "}
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10 text-center">
        <h2 className="text-center text-2xl font-semibold mb-7">
          Past Comments{" "}
        </h2>
        <div className="space-y-4 max-h-96 overflow-y-auto break-words">
          {comments.map((comment) => (
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-colors duration-200" key={comment._id}>
              <div className="flex items-start gap-3">{comment.message}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
