import React from "react";

const CurrentPageContext = React.createContext({
    currentPage: null,
    setCurrentPage: () => {}
  });

export default CurrentPageContext;