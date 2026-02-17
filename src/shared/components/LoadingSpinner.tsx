import styles from './LoadingSpinner.module.css';

export function LoadingSpinner(): React.JSX.Element {
  return (
    <div className={styles.container} role="status" aria-label="Loading stations">
      <div className={styles.spinner} />
      <p className={styles.text}>Loading stations...</p>
    </div>
  );
}
