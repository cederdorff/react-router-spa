import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles.css";
import App from "./App.jsx";

console.log(import.meta.env.BASE_URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/react-router-spa/"}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
