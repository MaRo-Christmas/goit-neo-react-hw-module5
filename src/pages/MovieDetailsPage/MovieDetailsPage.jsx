import { useState, useEffect, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from || '/movies';

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  if (!movie) return null;

  const {
    title,
    poster_path,
    vote_average,
    overview,
    genres = [],
    release_date
  } = movie;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : 'Unknown';
  const userScore = Math.round(vote_average * 10);
  const genresList = genres.map(genre => genre.name).join(', ');

  return (
    <div className={css.container}>
      <Link to={backLinkHref} className={css.backBtn}>
        ← Go back
      </Link>

      <div className={css.movieDetails}>
        <div className={css.posterContainer}>
          {poster_path ? (
            <img
              src={getImageUrl(poster_path)}
              alt={title}
              className={css.poster}
            />
          ) : (
            <div className={css.noPoster}>No poster available</div>
          )}
        </div>

        <div className={css.info}>
          <h1 className={css.title}>
            {title} ({releaseYear})
          </h1>

          <div className={css.section}>
            <h3 className={css.sectionTitle}>User Score</h3>
            <p className={css.userScore}>{userScore}%</p>
          </div>

          <div className={css.section}>
            <h3 className={css.sectionTitle}>Overview</h3>
            <p>{overview}</p>
          </div>

          <div className={css.section}>
            <h3 className={css.sectionTitle}>Genres</h3>
            <p>{genresList || 'No genres available'}</p>
          </div>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3 className={css.additionalTitle}>Additional information</h3>
        <div className={css.additionalLinks}>
          <Link
            to="cast"
            state={{ from: backLinkHref }}
            className={css.infoLink}
          >
            Cast
          </Link>
          <Link
            to="reviews"
            state={{ from: backLinkHref }}
            className={css.infoLink}
          >
            Reviews
          </Link>
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
