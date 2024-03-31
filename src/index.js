import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieProvider } from "./Context/Moviecontext";
import Favourites from "./Pages/Favourites";
import WishList from "./Pages/WishList";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MovieProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/wishlist" element={<WishList />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </MovieProvider>
    </ChakraProvider>
  </React.StrictMode>
);
