import styles from "./PingServer.module.css";

export default function PingServer({ pingServer, isLoading, isServerAlive }) {
  return (
    <button
      onClick={pingServer}
      disabled={isLoading || isServerAlive}
      className={`${isServerAlive ? styles.serverAlive : styles.serverDown} ${
        isLoading ? styles.serverLoading : ""
      }`}
    >
      {isLoading
        ? "Attivazione in corso..."
        : isServerAlive
        ? "Server attivo"
        : "Attiva il server"}
    </button>
  );
}
