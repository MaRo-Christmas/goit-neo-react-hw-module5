// src/services/api.js

import axios from "axios";

const API_KEY = "036c5556ec02057dc363ed02d5490085"; // <- ваш API Key (залишив для інформації)
const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzZjNTU1NmVjMDIwNTdkYzM2M2VkMDJkNTQ5MDA4NSIsIm5iZiI6MTc0MjQ5Njc3Ni4wNzMsInN1YiI6IjY3ZGM2NDA4ZGI3NmQwNDMzY2YyYzVhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hk1RfjvyUAfH5kaGifqHBMgmbOgRe4g29xhHmNTTyyw";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

axios.defaults.baseURL = BASE_URL;

const options = {
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
};

// Fetch trending movies for homepage
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/day`, options);
  return response.data.results;
};

// Search movies by keyword
export const searchMovies = async (query) => {
  const response = await axios.get(
    `/search/movie?include_adult=false&language=en-US&query=${query}`,
    options
  );
  return response.data.results;
};

// Get detailed movie information
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return response.data;
};

// Get movie cast
export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

// Get movie reviews
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response.data.results;
};

// Helper function to get full image URL
export const getImageUrl = (path) => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${path}`;
};

export default {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
  getImageUrl,
};
