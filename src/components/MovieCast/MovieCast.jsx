import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieCastCard from '../MovieCastCard/MovieCastCard';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError('Failed to fetch cast information. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  if (cast.length === 0) {
    return <p className={css.emptyState}>No cast information available</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li key={actor.id}>
            <MovieCastCard actor={actor} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
