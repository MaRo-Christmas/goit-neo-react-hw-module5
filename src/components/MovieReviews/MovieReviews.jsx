import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError('Failed to fetch reviews. Please try again later.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  if (reviews.length === 0) {
    return (
      <p className={css.emptyState}>No reviews available for this movie</p>
    );
  }

  return (
    <div className={css.container}>
      <ul className={css.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={css.reviewItem}>
            <h4 className={css.author}>Author: {review.author}</h4>
            <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
