import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <p className={css.message}>Oops! Page not found</p>
      <p className={css.description}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={css.homeBtn}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
