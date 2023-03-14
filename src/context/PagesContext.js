import React from "react";

const PagesContext = React.createContext({
    pages: [],
    setPages: () => {}
  });

export default PagesContext;