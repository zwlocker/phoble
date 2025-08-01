import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AuthButton from "./AuthButton/AuthButton";
import Timer from "./Timer/Timer";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const Navbuttons = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        component="img"
        src="../../../logo.png"
        height={110}
        onClick={() => navigate("/")}
        sx={{ mb: 3, cursor: "pointer" }}
        className="transition hover:scale-102 hover:rotate-1 transition-transform ease-in-out"
      />
      <Timer />
      <div className="flex gap-9 h-12 items-center mt-9">
        <button className="px-3 h-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-3xl hover:bg-white/20 hover:border-white/30 transition-all duration-200 cursor-pointer">
          <QuestionMarkIcon sx={{ fontSize: 16 }} />
        </button>
        <button
          onClick={() => navigate("/history")}
          className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-medium cursor-pointer"
        >
          <HistoryIcon className="w-5 h-5" />
          <span>Past Songs</span>
        </button>
        <AuthButton />
      </div>
    </Box>
  );
};

export default Navbuttons;
