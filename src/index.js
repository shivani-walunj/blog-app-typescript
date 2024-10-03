import React from "react";
import ReactDOM from "react-dom/client"; // Replaced deprecated ReactDOM method
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
