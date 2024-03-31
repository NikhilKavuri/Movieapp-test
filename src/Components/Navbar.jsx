import React, { useState } from "react";
import {
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Input,
  Button,
  Checkbox,
  Tag,
  TagLabel,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { DiscoverMoviesApi } from "../Api/MovieApi";
import { useMovieContext } from "../Context/Moviecontext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const {
    page,
    setPage,
    setPopularMovies,
    setShowWishList,
    setShowFavourites,
    setDisableScrollPagination,
  } = useMovieContext();
  const [isOpen, setIsOpen] = useState(false);
  const [releases, setReleases] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [scoreRange, setScoreRange] = useState([0, 10]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const onClose = () => {
    setIsOpen(false);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const SearchMovies = async () => {
    try {
      setIsOpen(false);
      setShowSpinner(true);
      const parameters = {
        genre: selectedTags.join(","),
        releases,
        language: selectedLanguage,
        scoreRange: scoreRange,
        fromDate,
        toDate,
        page,
      };
      const res = await DiscoverMoviesApi(parameters);
      if (res["results"]) {
        const moviesWithExtras = res.results.map((movie) => ({
          ...movie,
          wishList: false,
          favourite: false,
        }));

        setPopularMovies([...moviesWithExtras]);
      }
    } catch (err) {
      console.error("Error searching movies:", err);
      <Alert status="error">
        <AlertIcon />
        An error occurred while searching movies
      </Alert>;
    } finally {
      setShowSpinner(false);
    }
  };

  const tags = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Ficton",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  const languages = [
    "English",
    "Mandarin Chinese",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Russian",
    "Korean",
    "Italian",
    "Portuguese",
    "Arabic",
    "Bengali",
    "Turkish",
    "Dutch",
  ];

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      alignItems="center"
      justify="space-between"
      px="4"
      py="2"
      bg="white"
      boxShadow="sm"
    >
      <Text
        cursor={"pointer"}
        onClick={() => {
          navigate("/");
          setShowWishList(false);
          setShowFavourites(false);
          setDisableScrollPagination(false);
        }}
        fontWeight="bold"
      >
        Movie App
      </Text>

      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="Menu"
        icon={<HamburgerIcon />}
        variant="ghost"
        colorScheme="gray"
        fontSize="20px"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} closeOnEsc>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sort and Filter</DrawerHeader>

          <DrawerBody>
            <Flex direction="column" gap="10px">
              <Checkbox
                value={releases}
                onChange={() => setReleases(!releases)}
              >
                <span style={{ fontSize: "0.9em" }}>Search all Releases?</span>
              </Checkbox>
              <Flex align="center" gap="5px" justifyContent="space-between">
                <span style={{ fontSize: "0.8em", color: "grey" }}>from</span>
                <Input
                  width="80%"
                  placeholder="Select Date and Time"
                  size="sm"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Flex>
              <Flex align="center" gap="5px" justifyContent="space-between">
                <span style={{ fontSize: "0.8em", color: "grey" }}>to</span>
                <Input
                  width="80%"
                  placeholder="Select Date and Time"
                  size="sm"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Flex>
              <Flex flexWrap="wrap" mt="4" gap="2">
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    size="lg"
                    variant={selectedTags.includes(tag) ? "solid" : "outline"}
                    colorScheme="blue"
                    cursor="pointer"
                  >
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                ))}
              </Flex>
              <Flex align="center" gap="5px" justifyContent="space-between">
                <span style={{ fontSize: "0.8em", color: "grey" }}>
                  Language
                </span>
                <Select
                  width="80%"
                  placeholder="Select Language"
                  size="sm"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {languages.map((language, index) => (
                    <option key={index} value={language}>
                      {language}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Flex align="center" gap="5px" justifyContent="space-between">
                <span style={{ fontSize: "0.8em", color: "grey" }}>
                  Score Range
                </span>
                <Slider
                  width="80%"
                  size="sm"
                  min={0}
                  max={10}
                  step={0.1}
                  value={scoreRange}
                  onChange={(value) => setScoreRange(value)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6} />
                </Slider>
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="blue"
              width={"100%"}
              size={"sm"}
              onClick={SearchMovies}
              disabled={
                selectedTags.length === 0 && !releases && !selectedLanguage
              }
            >
              Search
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {showSpinner && <Spinner position={"fixed"} left={"50%"} />}
    </Flex>
  );
};

export default Navbar;
