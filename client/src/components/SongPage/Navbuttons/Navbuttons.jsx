import React, { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AuthButton from "./AuthButton/AuthButton";
import Timer from "./Timer/Timer";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Info from "../../Info/Info";

/*
 * This is the Navbuttons component, which displays the Phoble logo, the countdown
 * for the next song, and the AuthButton component.
 */
const Navbuttons = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const onClose = () => {
    setIsInfoOpen(false);
  };

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 4,
      }}
    >
      {isInfoOpen && <Info onClose={onClose} />}
      <Box
        component="img"
        src="../../../logo.png"
        height={110}
        width={220}
        minWidth={220}
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
        className="transition hover:scale-102 hover:rotate-1 transition-transform ease-in-out"
      />
      <Timer />
      <div className="flex flex-wrap gap-9 items-center mt-9">
        <button
          onClick={() => {
            setIsInfoOpen(true);
          }}
          className="px-3 h-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-3xl hover:bg-white/20 hover:border-white/30 transition-all duration-200 cursor-pointer"
        >
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
