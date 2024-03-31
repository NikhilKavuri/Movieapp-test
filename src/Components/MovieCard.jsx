import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useInView } from "react-intersection-observer";
import { fetchMovieVideosApi } from "../Api/MovieApi";

const MovieCard = ({ movie, onUpdate }) => {
  const { id, poster_path, title, vote_average, wishList, favourite } = movie;
  const [filledStars, setFilledStars] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const videoRef = useRef(null);

  const GetMovieVideoApi = async () => {
    try {
      const res = await fetchMovieVideosApi(id);
      if (res && res.results.length > 0) {
        setVideoKey(res.results[0].key);
      }
    } catch (err) {
      console.error("Error while getting the video data:", err);
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await fetchMovieVideosApi(id);
        if (res && res.results.length > 0) {
          setVideoKey(res.results[0].key);
        }
      } catch (err) {
        console.error("Error while getting the video data:", err);
      }
    };

    if (isIntersecting) {
      fetchVideoData();
      GetMovieVideoApi();
    }
  }, [id, isIntersecting]);

  useEffect(() => {
    const stars = Math.floor(vote_average / 2);
    setFilledStars(stars);
  }, [vote_average]);

  useEffect(() => {
    if (isIntersecting && videoRef.current) {
      videoRef.current.play();
    }
  }, [isIntersecting]);

  const handleFavouriteClick = () => {
    onUpdate(id, "favourite", !favourite);
  };

  const handleWishListClick = () => {
    onUpdate(id, "wishList", !wishList);
  };

  const { ref } = useInView({
    threshold: 0.5,
    triggerOnce: true,
    onEnter: () => {
      setIsIntersecting(true);
    },
  });

  return (
    <div
      onMouseEnter={() => {
        GetMovieVideoApi();
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      ref={ref}
    >
      <Card
        maxW="sm"
        _hover={{ boxShadow: "lg", cursor: "pointer" }}
        width={"300px"}
        minHeight={"600px"}
        height={"fit-content"}
      >
        {(isHovered || isIntersecting) && videoKey && (
          <iframe
            ref={videoRef}
            width="300"
            height="400"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {!isHovered && !isIntersecting && (
          <CardBody>
            <Image
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
              borderRadius="lg"
            />
            <Text mt="2" fontWeight="bold" fontSize="24px" textAlign="center">
              {title}
            </Text>
          </CardBody>
        )}
        <CardFooter>
          <Flex justify={"space-between"} align="center" width={"100%"}>
            <Flex align="center" gap="4px">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{ color: index < filledStars ? "#FFC94A" : "gray" }}
                />
              ))}
            </Flex>
            <Flex gap="4px">
              {favourite ? (
                <FavoriteIcon color="red" onClick={handleFavouriteClick} />
              ) : (
                <FavoriteBorderIcon
                  color="blue"
                  onClick={handleFavouriteClick}
                />
              )}
              {wishList ? (
                <BookmarkIcon color="red" onClick={handleWishListClick} />
              ) : (
                <BookmarkBorderIcon
                  color="blue"
                  onClick={handleWishListClick}
                />
              )}
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieCard;
