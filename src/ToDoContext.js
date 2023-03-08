import React from "react";

const ToDoContext = React.createContext({
    toDo: null,
    setToDo: () => {}
  });

export default ToDoContext;