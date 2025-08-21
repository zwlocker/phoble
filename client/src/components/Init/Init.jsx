import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../contexts/AuthContext";
import { initUser } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/*
 * This is the Init component, which appears for users signing in for the first time.
 * Here, users can create a username to be displayed on their profile and in their comments.
 */
const Init = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.username) {
        navigate("/");
        return;
      }
    }
  }, [user, isAuthenticated, loading]);

  if (loading) {
    return null;
  }
  const handleSubmit = async () => {
    const result = await initUser(user._id, username);
    if (result.success) {
      location.href = "http://localhost:5173";
    } else {
      toast.clearWaitingQueue();
      toast.error(result.error, {
        className:
          "bg-red-500/20 text-white border border-red-400/30 rounded-xl",
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden justify-center gap-12">
      <Box
        component="img"
        src="../../../logo.png"
        height={110}
        onClick={() => navigate("/")}
        sx={{ mb: 3, cursor: "pointer" }}
      />
      <div className="text-center mb-90">
        <h1 className="text-3xl mb-6">Choose your display name</h1>
        <div className="flex gap-5">
          <input
            type="text"
            value={username}
            placeholder="phoblelover123"
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg disabled:opacity-50"
            onClick={handleSubmit}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Init;
