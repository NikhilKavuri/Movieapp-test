/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../Components/MovieCard";
import {
  Wrap,
  WrapItem,
  Alert,
  AlertIcon,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { GetPopularMoviesApi } from "../Api/MovieApi";
import { useMovieContext } from "../Context/Moviecontext";

const Home = () => {
  const {
    setPopularMovies,
    popularMovies,
    page,
    setPage,
    disableScrollPagination,
    setDisableScrollPagination,
  } = useMovieContext();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offline, setOffline] = useState(!navigator.onLine);

  const observer = useRef(null);
  const lastMovieRef = useRef();
  const toast = useToast();

  useEffect(() => {
    if (!disableScrollPagination) loadMorePopularMovies();
  }, [page]);

  useEffect(() => {
    setDisableScrollPagination(false);
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (lastMovieRef.current) {
      observer.current.observe(lastMovieRef.current);
    }
  }, [popularMovies]);
  console.log(disableScrollPagination);
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore && !disableScrollPagination) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const onUpdate = (id, property, value) => {
    const movie = popularMovies.find((movie) => movie.id === id);
    movie[property] = value;
    console.log(movie);
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
    } else {
      localStorage.setItem(property, JSON.stringify([movie]));
    }

    const updatedMovies = popularMovies.map((m) =>
      m.id === id ? { ...m, [property]: value } : m
    );
    setPopularMovies(updatedMovies);
    localStorage.setItem("popularMovies", JSON.stringify(updatedMovies));
  };
  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const res = await GetPopularMoviesApi(page);
      if (res.results && res.results.length > 0) {
        const moviesWithExtras = res.results.map((movie) => ({
          ...movie,
          wishList: false,
          favourite: false,
        }));
        setPopularMovies([...moviesWithExtras]);
        const storedMovies =
          JSON.parse(localStorage.getItem("popularMovies")) || [];
        localStorage.setItem(
          "popularMovies",
          JSON.stringify([...storedMovies, ...moviesWithExtras])
        );

        setLoading(false);
      } else {
        setHasMore(false);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error while getting the list from api ", err);
      setLoading(false);
      <Alert status="error">
        <AlertIcon />
        Error while getting the list from api
      </Alert>;
    }
  };
  const loadMorePopularMovies = async () => {
    try {
      setLoading(true);
      const res = await GetPopularMoviesApi(page);
      if (res.results && res.results.length > 0) {
        const moviesWithExtras = res.results.map((movie) => ({
          ...movie,
          wishList: false,
          favourite: false,
        }));
        setPopularMovies((prevMovies) => [...prevMovies, ...moviesWithExtras]);
        const storedMovies =
          JSON.parse(localStorage.getItem("popularMovies")) || [];
        localStorage.setItem(
          "popularMovies",
          JSON.stringify([...storedMovies, ...moviesWithExtras])
        );

        setLoading(false);
      } else {
        setHasMore(false);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error while getting the list from api ", err);
      setLoading(false);
      <Alert status="error">
        <AlertIcon />
        Error while getting the list from api
      </Alert>;
    }
  };

  const handleOffline = () => {
    setOffline(true);
    toast({
      title: "Network Offline",
      description: "Please check your internet connection.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleOnline = () => {
    setOffline(false);
    loadPopularMovies();
    toast({
      title: "Network Online",
      description: "Your internet connection has been restored.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <div>
      {offline ? (
        <Wrap spacing="24px" justify="center">
          {popularMovies.map((movie, index) => (
            <WrapItem
              key={index}
              ref={popularMovies.length === index + 1 ? lastMovieRef : null}
            >
              <MovieCard movie={movie} onUpdate={onUpdate} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Wrap spacing="24px" justify="center">
          {localStorage.getItem("popularMovies") ? (
            JSON.parse(localStorage.getItem("popularMovies")).map(
              (movie, index) => (
                <WrapItem
                  key={index}
                  ref={popularMovies.length === index + 1 ? lastMovieRef : null}
                >
                  <MovieCard movie={movie} onUpdate={onUpdate} />
                </WrapItem>
              )
            )
          ) : (
            <span>No data to show</span>
          )}
        </Wrap>
      )}

      {loading && (
        <WrapItem key="loading" mt="4">
          <Skeleton height="400px" width="250px" />
          <Skeleton height="400px" width="250px" />
          <Skeleton height="400px" width="250px" />
          <Skeleton height="400px" width="250px" />
        </WrapItem>
      )}
      {!hasMore && (
        <WrapItem key="end" mt="4">
          <Alert status="info">
            <AlertIcon />
            End of Movies List
          </Alert>
        </WrapItem>
      )}
    </div>
  );
};

export default Home;
