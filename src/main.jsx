import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ShopeContextProvider } from "./context/ShopeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopeContextProvider>
      <App />
    </ShopeContextProvider>
  </BrowserRouter>
);
