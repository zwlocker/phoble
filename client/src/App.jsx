import React from "react";
import SongPage from "./components/SongPage/SongPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongGrid from "./components/SongGrid/SongGrid";
import { AuthProvider } from "./contexts/AuthContext";
import Init from "./components/Init/Init";
import { ToastContainer, Zoom } from "react-toastify";
import Profile from "./components/Profile/Profile";
import { Analytics } from "@vercel/analytics/next";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SongPage />} />
            <Route path="/song/:id" element={<SongPage />} />
            <Route path="/history" element={<SongGrid />} />
            <Route path="/initUser" element={<Init />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={2500}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme
            transition={Zoom}
            limit={3}
          />
        </AuthProvider>
      </Router>
      <Analytics />
    </>
  );
};

export default App;
