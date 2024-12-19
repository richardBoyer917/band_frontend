import React from "react";
import ReactDOM from "react-dom/client";
import RouterControl from "./router/RouterControl";

import "./styles/GlobalStyles.css";
import "./styles/fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterControl />
  </React.StrictMode>
);
