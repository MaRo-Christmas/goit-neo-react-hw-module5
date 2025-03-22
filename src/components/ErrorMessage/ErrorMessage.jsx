import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={css.error}>
      <p>{message || 'Something went wrong. Please try again later.'}</p>
    </div>
  );
};

export default ErrorMessage;