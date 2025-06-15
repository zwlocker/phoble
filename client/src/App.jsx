import React, { useState } from "react";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  );
};

export default App;
