import React from "react";
/*
This is the CommentBlocker component, which only renders if the user hasn't signed in
*/

const CommentBlocker = () => {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 group hover:bg-white/10 transition-colors duration-200 text-center text-xl">
      Comment to unlock the secrets within - unbiased opinions only.
    </div>
  );
};

export default CommentBlocker;
