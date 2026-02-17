import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  readonly message: string;
  readonly onRetry?: () => void;
}

export function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps): React.JSX.Element {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.icon}>!</div>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={styles.retryButton}
          aria-label="Retry loading stations"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
