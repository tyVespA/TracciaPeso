import { useEffect, useState, FormEvent } from "react";
import weightService from "./services/weights";
import styles from "./App.module.css";
import GoogleLogin from "./components/Auth/GoogleLogin";
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

  useEffect(() => {
    weightService.getAll().then((res) => {
      console.log(res.data);
      setWeights(res.data);
    });
  }, []);

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
        <h1>Weight tracker</h1>
        <GoogleLogin />
        <Error errorMessage={errorMessage} errorState={errorState} />
        <button
          className={styles.weightsListButton}
          onClick={handleWeightsListVisibility}
        >
          {showWeightsList ? "Hide" : "Show"} weight list
        </button>
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
          />
          <button>Add today's weight</button>
        </form>
      </main>
      <div className={styles.chartsContainer}>
        <DailyChart reload={reload} />
        <WeeklyChart reload={reload} />
      </div>
    </div>
  );
}

export default App;
