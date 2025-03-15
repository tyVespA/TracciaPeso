import styles from "./Error.module.css";

interface ErrorProps {
  errorMessage: string;
  errorState: boolean;
}

export default function Error({ errorMessage, errorState }: ErrorProps) {
  console.log("Error Component:", errorMessage, errorState);

  return (
    <div
      className={`${styles.errorContainer} ${
        errorState ? styles.active : styles.inactive
      }`}
    >
      <p>{errorMessage}</p>
    </div>
  );
}
