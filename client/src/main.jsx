import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppState from "./Context/AppState.jsx";
import UserState from "./Context/UserState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserState>
      <AppState>
        <App />
      </AppState>
    </UserState>
  </StrictMode>
);
