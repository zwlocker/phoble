import React from "react";
import Navbuttons from "../SongPage/Navbuttons/Navbuttons";
import Container from "@mui/material/Container";
import { useAuth } from "../../contexts/AuthContext";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import FavoriteIcon from "@mui/icons-material/Favorite";

/*
This is the Profile component. It can be accessed in the Navbar, and provides the user with
information about their Google profile and comment history when signed in, including
how long they've been a member of Phoble, their username, and their email.

This component calls the useAuth function in order to ensure that the user is signed in,
and to access the user's past comments.
*/

const Profile = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  if (!user) {
    return null;
  }
  const comments = user.pastComments;
  const renderStars = (rating) => {
    return Array.from({ length: Math.floor(rating) }, (_, index) => (
      <StarIcon key={index} className="text-amber-400" fontSize="small" />
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Navbuttons />
      <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Hey, {user.username}!</h1>
        <h2 className="text-center text-xl mb-4 font-semibold">
          Your profile at a glance
        </h2>
        <p className="text-gray-300">Email: {user.email}</p>
        <p className="text-gray-300">
          Member since:{" "}
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-10">
        <h2 className="text-center text-2xl font-semibold mb-7">
          Past Comments{" "}
        </h2>
        <div className="space-y-4 h-150 overflow-y-auto break-words">
          {comments.length == 0 && (
            <div className="text-center flex justify-center gap-1 text-xl">
              <p>No comments yet.</p>
              <p>You should probably change that.</p>
            </div>
          )}
          {comments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div
                className="bg-white/5 rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-colors duration-200"
                key={index}
              >
                <div className="flex gap-3">
                  <div className="max-w-30">
                    <img src={comment.songCover} className="h-30" />
                    <div className="text-center">{comment.songName}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1.5 items-center ">
                      <div className="text-gray-300">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                      {comment.stars != 0 && (
                        <div>
                          {renderStars(comment.stars)}
                          {comment.stars % 1 !== 0 && (
                            <StarHalfIcon
                              className="text-amber-400"
                              fontSize="small"
                            />
                          )}
                        </div>
                      )}
                      <FavoriteIcon
                        className="text-red-400"
                        sx={{ fontSize: 16 }}
                      />
                      <div className="text-gray-200 text-sm items-center">
                        {comment.likedBy.length}
                      </div>
                    </div>
                    <div className="text-gray-200 leading-relaxed break-words">
                      {comment.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
