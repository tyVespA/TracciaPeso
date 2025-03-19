import styles from "./PingServer.module.css";
import { useEffect } from "react";

interface PingServerProps {
  pingServer: () => void;
  isLoading: boolean;
  isServerAlive: boolean;
}

export default function PingServer({
  pingServer,
  isLoading,
  isServerAlive,
}: PingServerProps) {
  useEffect(() => {
    if (!isServerAlive) {
      pingServer();
    }
  }, [isServerAlive]);

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
        ? "Server attivo ✅"
        : "Attiva il server"}
    </button>
  );
}
