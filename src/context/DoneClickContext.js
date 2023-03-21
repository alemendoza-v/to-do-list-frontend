import React from "react";

const DoneClickContext = React.createContext({
    doneClick: false,
    setDoneClick: () => {}
  });

export default DoneClickContext;