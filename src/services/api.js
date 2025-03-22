import axios from 'axios';

const API_KEY = import.meta.env.VITE_THE_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

axios.defaults.baseURL = BASE_URL;

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
};

// Fetch trending movies for homepage
export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`/trending/movie/day`, options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Search movies by keyword
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `/search/movie?include_adult=false&language=en-US&query=${query}`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get detailed movie information
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `/movie/${movieId}?language=en-US`,
      options
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Get movie cast
export const fetchMovieCast = async (movieId) => {
  try {
    const response = await axios.get(
      `/movie/${movieId}/credits?language=en-US`,
      options
    );
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

// Get movie reviews
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `/movie/${movieId}/reviews?language=en-US`,
      options
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
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
