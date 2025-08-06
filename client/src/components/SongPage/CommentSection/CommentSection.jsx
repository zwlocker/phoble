import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Comment from "../Comment/Comment";
import { getSong, addComment, deleteComment } from "../../../api";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../../../contexts/AuthContext";
import AuthButton from "../Navbuttons/AuthButton/AuthButton";
import CommentBlocker from "./CommentBlocker/CommentBlocker";
import { toast } from "react-toastify";

const CommentSection = ({ songId }) => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [hasCommented, setHasCommented] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getSong(songId);
      setComments(data.comments || []);
    };

    fetchComments();

    const checkForComment = () => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].createdBy == user._id) {
          setHasCommented(true);
          return;
        }
      }
    };

    if (isAuthenticated) {
      checkForComment();
    }
  }, [songId, comments]);

  const handleSubmit = async () => {
    const res = await addComment(message, songId, user._id);
    setComments((prev) => [...prev, res]);
    setMessage("");
    toast.clearWaitingQueue();
    toast.success("Comment added successfully", {
      className:
        "bg-green-500/60 text-white border border-green-400/30 rounded-xl",
    });
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId, songId);
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  return (
    <div className="bg-white/8 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl h-fit mb-15">
      <div className="flex items-center gap-2 mb-6">
        <CommentIcon className="w-6 h-6 text-blue-400" />

        <h3 className="text-2xl font-bold">Comments</h3>
      </div>
      <div className="mb-6">
        <div className="flex gap-3">
          <Box className="w-full" sx={{ display: "flex", gap: 2, my: 2 }}>
            {isAuthenticated ? (
              <>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50"
                  onClick={handleSubmit}
                >
                  <SendIcon />
                </Button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sign in to comment..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled
                />
                <AuthButton />
              </>
            )}
          </Box>
        </div>
      </div>
      {hasCommented ? (
        <div className="space-y-4 max-h-96 overflow-y-auto break-words">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              songId={songId}
            />
          ))}
        </div>
      ) : (
        <CommentBlocker />
      )}
    </div>
  );
};

export default CommentSection;
