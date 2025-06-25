import React, { useState } from "react";
import Home from "./components/Home/Home";
import Container from "@mui/material/Container";
import Homevert from "./components/Home/Homevert";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Home />
    </Container>
  );
};

export default App;
