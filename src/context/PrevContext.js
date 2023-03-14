import React from "react";

const PrevContext = React.createContext({
    prev: null,
    setPrev: () => {}
  });

export default PrevContext;