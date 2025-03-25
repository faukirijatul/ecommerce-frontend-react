import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ShopeContextProvider } from "./context/ShopeContextProvider.jsx";
import { Bounce, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopeContextProvider>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </ShopeContextProvider>
  </BrowserRouter>
);
