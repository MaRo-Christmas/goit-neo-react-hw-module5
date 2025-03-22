import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({
  children,
  color = 'secondary',
  className = '',
  onClick,
  ...rest
}) {
  const btnColor = css[`btn-${color}`];
  return (
    <button
      className={clsx(css.btn, btnColor, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
