import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleLike } from "../../../api";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

/*
 * This is the Comment component. It determines the layout of a comment in the CommentSection component, including the
 * name of the user which created the comment, the comment, time elapsed since the comment was posted, the like button,
 * and the delete button, which only renders if the current user posted the comment.
 *
 * When the user toggles the like button, it passes this action to the backend to update the like count for the comment.
 * The props drilled into this component include the comment, the songId for the song which the comment is on, and
 * the onDelete method in order to process the user deleting a comment.
 */

const Comment = ({ comment, onDelete, songId }) => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  const [likes, setLikes] = useState(comment.likedBy.length);

  const checkLike = () => {
    for (let i = 0; i < comment.likedBy.length; i++) {
      if (comment.likedBy[i] === user._id) {
        return true;
      }
    }
    return false;
  };

  const [isLiked, setIsLiked] = useState(checkLike);

  const handleDeleteComment = async () => {
    await onDelete(comment._id);
    toast.clearWaitingQueue();
    toast.error("Comment deleted successfully", {
      className: "bg-red-500/60 text-white border border-red-400/30 rounded-xl",
    });
  };

  const handleLikeComment = async () => {
    const newIsLiked = !isLiked;

    const increment = newIsLiked ? 1 : -1;

    setIsLiked(newIsLiked);
    setLikes(likes + increment);
    await toggleLike(comment._id, songId, increment, user._id);
  };

  const renderStars = (rating) => {
    return Array.from({ length: Math.floor(rating) }, (_, index) => (
      <StarIcon key={index} className="text-amber-400" fontSize="small" />
    ));
  };

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const createdAtTime = new Date(createdAt);
    const diffInMs = now - createdAtTime;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-colors duration-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
          <PersonIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-purple-300">
              {comment.displayName}
            </span>
            {comment.stars != 0 && (
              <span className="text-xs">
                {renderStars(comment.stars)}
                {comment.stars % 1 !== 0 && (
                  <StarHalfIcon className="text-amber-400" fontSize="small" />
                )}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {getTimeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            {comment.message}
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center">
            {user._id === comment.createdBy && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 p-1"
              >
                <DeleteIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleLikeComment(comment._id)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              {isLiked ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderOutlinedIcon className="w-4 h-4" />
              )}
            </button>
            <p>{likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
