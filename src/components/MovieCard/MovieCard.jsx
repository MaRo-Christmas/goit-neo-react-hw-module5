import { getImageUrl } from '../../services/api';
import css from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={css.movieCard}>
      <div className={css.posterWrapper}>
        {movie.poster_path ? (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className={css.poster}
          />
        ) : (
          <div className={css.noPoster}>No poster available</div>
        )}
      </div>
      <div className={css.movieInfo}>
        <h3 className={css.movieTitle}>{movie.title}</h3>
        {movie.release_date && (
          <p className={css.movieYear}>
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
