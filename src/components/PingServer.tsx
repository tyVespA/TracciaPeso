import styles from "./PingServer.module.css";

export default function PingServer({ pingServer, isLoading, isServerAlive }) {
  return (
    <button
      onClick={pingServer}
      disabled={isLoading || isServerAlive}
      className={isServerAlive ? styles.isServerAlive : styles.isServerDown}
    >
      {isLoading ? "Attivazione in corso..." : "Attiva il server"}
    </button>
  );
}
