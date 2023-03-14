import React from "react";

const NextContext = React.createContext({
    next: null,
    setNext: () => {}
  });

export default NextContext;