import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError('Failed to fetch trending movies. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
