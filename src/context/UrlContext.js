import React from "react";

const UrlContext = React.createContext({
    url: [],
    setUrl: () => {}
    });

export default UrlContext;