import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { MovieProvider } from "./Context/Moviecontext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </ChakraProvider>
  </React.StrictMode>
);
