import React, { useState } from "react";

const App = () => {
  let [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white cursor-pointer m-2 rounded-md px-3 py-1 text-sm shadow-lg shadow-neutral-500/20 transition active:scale-[.95]"
    >
      {count}
    </button>
  );
};

export default App;
