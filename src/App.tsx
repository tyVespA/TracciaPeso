import { useEffect, useState, FormEvent } from "react";
import weightService from "./services/weights";
import styles from "./App.module.css";
import PingServer from "./components/PingServer";
import GoogleLogin from "./components/Auth/GoogleLogin";
import UserPreview from "./components/Auth/UserPreview";
import WeightsList from "./components//WeightsList/WeightsList";
import DailyChart from "./components/Charts/DailyChart";
import WeeklyChart from "./components/Charts/WeeklyChart";
import Error from "./components/Error";
import handleErrorMessage from "./utils/handleErrorMessage";

interface Weight {
  id: string;
  weight: number | undefined;
}

function App() {
  const [weights, setWeights] = useState<Weight[]>([]);
  const [showWeightsList, setShowWeightsList] = useState(true);
  const [newWeight, setNewWeight] = useState("");
  const [reload, setReload] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorState, setErrorState] = useState(false);

  const [isServerAlive, setIsServerAlive] = useState<boolean | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  interface User {
    name: string;
    picture: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);

  const handleTestLogin = () => {
    const testUser = {
      firebaseId: "test1234",
      email: "testuser@example.com",
      name: "Test User",
      picture: "https://www.example.com/test-user.jpg",
    };
    localStorage.setItem("user", JSON.stringify(testUser));
    setUser(testUser);
  };

  const pingServer = () => {
    setIsLoading(true);
    weightService
      .pingServer()
      .then((res) => {
        if (res === "pong") {
          setIsServerAlive(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    weightService.pingServer().then((res) => {
      if (res === "pong") {
        setIsServerAlive(true);
      }
    });
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    weightService.getAll().then((res) => {
      console.log(res.data);
      setWeights(res.data);
    });
  }, []);

  const handleLoginSuccess = (user) => {
    console.log("User logged in:", user);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    window.location.reload();
  };

  function handleWeightsListVisibility() {
    setShowWeightsList(!showWeightsList);
    console.log(showWeightsList);
  }

  function addWeight(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleErrorMessage({ newWeight, setErrorMessage, setErrorState });
    const newWeightObject = {
      weight: Number(newWeight),
    };

    weightService.create(newWeightObject).then((res) => {
      setWeights(weights.concat(res.data));
      setNewWeight("");
      setReload((prev) => !prev);
    });
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {user ? <UserPreview user={user} setUser={setUser} /> : ""}
        <h1>TracciaPeso</h1>
        {user ? (
          <div>
            <Error errorMessage={errorMessage} errorState={errorState} />
            <p>Stato del server: {isServerAlive ? "attivo" : "disattivo"}</p>
            {isServerAlive ? (
              ""
            ) : (
              <div>
                <p>Il server è stato spento per inattività</p>
                <PingServer
                  pingServer={pingServer}
                  isLoading={isLoading}
                  isServerAlive={isServerAlive}
                />
              </div>
            )}
            {weights.length == 0 ? (
              <div>
                Inizia a inserire il tuo peso in kg con il modulo sottostante
              </div>
            ) : (
              <button
                className={styles.weightsListButton}
                onClick={handleWeightsListVisibility}
              >
                {showWeightsList ? "Nascondi" : "Mostra"} i pesi salvati
              </button>
            )}
            {showWeightsList ? (
              <WeightsList
                weights={weights}
                setWeights={setWeights}
                setReload={setReload}
              />
            ) : (
              ""
            )}
            <form action="" onSubmit={addWeight} className={styles.form}>
              <input
                type="text"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Peso odierno"
              />
              <button
                className={styles.aggiungiPesoBtn}
                disabled={!isServerAlive}
              >
                Aggiungi peso
              </button>
            </form>
            <div className={styles.chartsContainer}>
              <DailyChart reload={reload} />
              <WeeklyChart reload={reload} />
            </div>
          </div>
        ) : (
          <div className={styles.signInScreen}>
            <p>Un'app semplice ed efficace per monitorare il tuo peso.</p>
            <p>
              Registra i tuoi dati giornalieri, osserva le variazioni nel tempo
              e analizza l'andamento giornaliero e le medie settimanali con
              grafici intuitivi.
            </p>
            <br />
            <p>
              L'app è hostata su render.com e dopo periodi di inattività è
              necessario riattiavare il server prima di poter fare il login. La
              riattivazione può impiegare fino a 60 secondi.
            </p>
            <div className={styles.loginBtns}>
              <PingServer
                pingServer={pingServer}
                isLoading={isLoading}
                isServerAlive={isServerAlive}
              />
              <GoogleLogin
                onLoginSuccess={handleLoginSuccess}
                isServerAlive={isServerAlive}
              />
              <button onClick={handleTestLogin} disabled={!isServerAlive}>
                Accedi come ospite Demo
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
