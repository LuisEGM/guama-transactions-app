import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <main className="container mx-auto">
      <App />
    </main>
  </NextUIProvider>
);
