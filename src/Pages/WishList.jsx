/* eslint-disable */
import React, { useEffect } from "react";
import { useMovieContext } from "../Context/Moviecontext";
import { Wrap, WrapItem } from "@chakra-ui/react";
import MovieCard from "../Components/MovieCard";

const Favourites = () => {
  const { wishLists, setWishLists, popularMovies, setPopularMovies } =
    useMovieContext();

  useEffect(() => {
    let lists = localStorage.getItem("wishList");
    if (lists) {
      let data = JSON.parse(lists);
      setWishLists(data);
    }
  }, []);
  const onUpdate = (id, property, value) => {
    const movie = popularMovies.find((movie) => movie.id === id);
    movie[property] = value;

    let stored = localStorage.getItem(property);
    if (stored) {
      let data = JSON.parse(stored);

      const existingIndex = data.findIndex((m) => m.id === movie.id);
      if (existingIndex !== -1) {
        data.splice(existingIndex, 1);
      } else {
        data.push(movie);
      }

      localStorage.setItem(property, JSON.stringify(data));
      setWishLists(data);
    } else {
      localStorage.setItem(property, JSON.stringify([movie]));
    }

    const updatedMovies = popularMovies.map((m) =>
      m.id === id ? { ...m, [property]: value } : m
    );
    setPopularMovies(updatedMovies);
    localStorage.setItem("popularMovies", JSON.stringify(updatedMovies));
  };

  return (
    <div
      style={{
        paddingTop: "60px",
        paddingBottom: "65px",
        background: "#f3f3f3",
      }}
    >
      {wishLists.length > 0 ? (
        <Wrap spacing="24px" justify="center">
          {wishLists.map((movie, index) => (
            <WrapItem key={index}>
              <MovieCard movie={movie} onUpdate={onUpdate} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Create wishlist to add
        </span>
      )}
    </div>
  );
};

export default Favourites;
