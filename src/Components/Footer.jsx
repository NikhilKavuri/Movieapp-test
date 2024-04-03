/* eslint-disable */
import React, { useState } from "react";
import { Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { useMovieContext } from "../Context/Moviecontext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const {
    setDisableScrollPagination,
    setFavourites,
    setWishLists,
    setShowWishList,
    setShowFavourites,
  } = useMovieContext();
  const [filterOption, setFilterOption] = useState("favorites");
  const navigate = useNavigate();
  const handleFilter = (option) => {
    setFilterOption(option);
    setDisableScrollPagination(true);
    if (option === "favorites") {
      navigate("/favourites");
      setShowFavourites(true);
      setShowWishList(false);
      const storedMovies =
        JSON.parse(localStorage.getItem("popularMovies")) || [];
      const filteredMovies = storedMovies.filter((movie) => movie.favourite);
      setFavourites(filteredMovies);
    } else if (option === "wishlist") {
      navigate("/wishlist");
      setShowWishList(true);
      setShowFavourites(false);
      const storedMovies =
        JSON.parse(localStorage.getItem("popularMovies")) || [];
      const filteredMovies = storedMovies.filter((movie) => movie.wishList);
      setWishLists(filteredMovies);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        background: "white",
        padding: "10px",
      }}
    >
      <Flex gap={"5px"}>
        <Button
          width={"50%"}
          colorScheme={filterOption === "favorites" ? "blue" : "gray"}
          onClick={() => handleFilter("favorites")}
        >
          Favorites
        </Button>
        <Button
          width={"50%"}
          colorScheme={filterOption === "wishlist" ? "blue" : "gray"}
          onClick={() => handleFilter("wishlist")}
        >
          Wishlist
        </Button>
      </Flex>
    </div>
  );
};

export default Footer;
