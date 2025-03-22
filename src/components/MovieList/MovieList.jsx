import { Link, useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.movieLink}
          >
            <MovieCard movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
