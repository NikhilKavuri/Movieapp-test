import React, { useState, useContext, createContext } from "react";
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [disableScrollPagination, setDisableScrollPagination] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [wishLists, setWishLists] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        setPopularMovies,
        page,
        setPage,
        setDisableScrollPagination,
        disableScrollPagination,
        wishLists,
        setWishLists,
        favourites,
        setFavourites,
        showFavourites,
        setShowFavourites,
        showWishList,
        setShowWishList,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
