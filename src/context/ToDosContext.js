import React from "react";

const ToDosContext = React.createContext({
    toDos: [],
    setToDos: () => {}
  });

export default ToDosContext;