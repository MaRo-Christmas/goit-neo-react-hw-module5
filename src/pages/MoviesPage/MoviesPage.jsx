import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import Button from '../../components/Button/Button';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.elements.query.value.trim();

    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const searchForMovies = async () => {
      setIsLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        setError('Failed to search movies. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchForMovies();
  }, [query]);

  return (
    <div className={css.container}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          className={css.searchInput}
          defaultValue={query}
          placeholder="Search for movies..."
        />
        <Button type="submit" color="primary">
          Search
        </Button>
      </form>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && query && movies.length === 0 && (
        <p className={css.emptyState}>No movies found for "{query}"</p>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
