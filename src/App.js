/* eslint-disable */
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";
import WishList from "./Pages/WishList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
                <Home />
              </div>
            }
          ></Route>
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
