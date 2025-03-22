import { getImageUrl } from '../../services/api';
import css from './MovieCastCard.module.css';

const MovieCastCard = ({ actor }) => {
  return (
    <div className={css.castCard}>
      <div className={css.imageWrapper}>
        {actor.profile_path ? (
          <img
            src={getImageUrl(actor.profile_path)}
            alt={actor.name}
            className={css.image}
          />
        ) : (
          <div className={css.noImage}>No image</div>
        )}
      </div>
      <div className={css.actorInfo}>
        <p className={css.actorName}>{actor.name}</p>
        <p className={css.character}>
          Character: {actor.character || 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default MovieCastCard;
