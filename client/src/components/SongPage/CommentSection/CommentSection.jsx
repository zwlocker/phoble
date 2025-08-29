import React, { useEffect, useState, useMemo } from "react";
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
import StarRating from "./StarRating/StarRating";

/*
 * This is the CommentSection component. Here, users can rate songs, comment on songs, as well as
 * view comments made by others.
 */
const CommentSection = ({ songId }) => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [hasCommented, setHasCommented] = useState(false);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Memoized filtered and sorted comments
  const sortedComments = useMemo(() => {
    const commentsCopy = [...comments];

    switch (sortBy) {
      case "newest":
        return commentsCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

      case "oldest":
        return commentsCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

      case "popular":
        return commentsCopy.sort((a, b) => {
          const aLikes = a.likedBy.length || 0;
          const bLikes = b.likedBy.length || 0;
          return bLikes - aLikes;
        });

      default:
        return commentsCopy;
    }
  }, [comments, sortBy]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getSong(songId);
      setComments(data.comments || []);
    };

    fetchComments();
  }, [songId]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const alreadyCommented = comments.some(
      (comment) => comment.createdBy === user._id
    );
    setHasCommented(alreadyCommented);
  }, [comments, isAuthenticated, user]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSubmit = async () => {
    if (message == "" || message.trim().length === 0) {
      toast.clearWaitingQueue();
      toast.error("Comment must contain characters", {
        className:
          "bg-red-500/60 text-white border border-red-400/30 rounded-xl",
      });
      return;
    }
    const res = await addComment(message, songId, user._id, rating);
    setComments((prev) => [...prev, res]);
    setMessage("");
    setRating(0);
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
      <div className="flex gap-2 items-center mb-6 flex-wrap">
        <CommentIcon className="w-6 h-6 text-blue-400" />
        <h3 className="text-2xl font-bold">Comments</h3>
        <StarRating rating={rating} setRating={setRating} />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border border-white/10 bg-white/5 border rounded-md ml-3 cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
      <div className="mb-6">
        <div className="flex gap-3">
          <Box
            className="w-full"
            sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}
          >
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
          {sortedComments.map((comment) => (
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
