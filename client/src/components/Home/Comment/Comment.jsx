import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../api";
import PersonIcon from "@mui/icons-material/Person";

const Comment = ({ comment, onDelete }) => {
  const handleDeleteComment = async () => {
    await deleteComment(comment._id);
    onDelete(comment._id);
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
              EDM Fan
            </span>
            <span className="text-xs text-gray-400">1 hour ago</span>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            {comment.message}
          </p>
        </div>
        <button
          onClick={() => handleDeleteComment(comment._id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 p-1"
        >
          <DeleteIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Comment;
