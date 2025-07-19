import React, { useState } from "react";
import SongPage from "./components/SongPage/SongPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongGrid from "./components/SongGrid/SongGrid";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SongPage />} />
          <Route path="/song/:id" element={<SongPage />} />
          <Route path="/history" element={<SongGrid />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
