import axios from "axios";

export const GetPopularMoviesApi = async (page) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: page,
          sort_by: "popularity.desc",
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmRhOTUwMjBmMTJkMzgwNDllMGZjMjJjOTNmMjBjMyIsInN1YiI6IjY2MDg1YjY0MjgzZWQ5MDE3YzFhOGQ3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-j4B1n_0h0Kaz7-COnb4SRMtkYWFiDlLBEsjRSniXJg",
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error while getting the list from api " + err);
    throw err;
  }
};
export const DiscoverMoviesApi = async (params) => {
  const { page, fromDate, toDate, genre, language, scoreRange } = params;
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";

  let queryParams = new URLSearchParams({
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: page,
    sort_by: "popularity.desc",
  });

  if (fromDate) {
    queryParams.append("release_date.gte", fromDate);
  }

  if (toDate) {
    queryParams.append("release_date.lte", toDate);
  }

  if (genre) {
    queryParams.append("with_genres", genre);
  }

  if (scoreRange) {
    queryParams.append("vote_average.gte", scoreRange);
  }
  if (language) {
    queryParams.append("ith_original_language", language);
  }

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmRhOTUwMjBmMTJkMzgwNDllMGZjMjJjOTNmMjBjMyIsInN1YiI6IjY2MDg1YjY0MjgzZWQ5MDE3YzFhOGQ3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-j4B1n_0h0Kaz7-COnb4SRMtkYWFiDlLBEsjRSniXJg",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching discover movies:", error);
  }
};

export const fetchMovieVideosApi = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmRhOTUwMjBmMTJkMzgwNDllMGZjMjJjOTNmMjBjMyIsInN1YiI6IjY2MDg1YjY0MjgzZWQ5MDE3YzFhOGQ3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-j4B1n_0h0Kaz7-COnb4SRMtkYWFiDlLBEsjRSniXJg",
    },
  };

  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error(error.message);
    }
    throw error;
  }
};
