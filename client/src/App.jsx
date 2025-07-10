import React, { useState } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongGrid from "./components/SongGrid/SongGrid";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<SongGrid />} />
      </Routes>
    </Router>
  );
};

export default App;
