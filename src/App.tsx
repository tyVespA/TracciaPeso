import { useEffect, useState, FormEvent } from "react";
import weightService from "./services/weights";
import styles from "./App.module.css";
import WeightsList from "./components/WeightsList";
import DailyChart from "./components/DailyChart";
import WeeklyChart from "./components/WeeklyChart";

interface Weight {
  id: string;
  weight: number | undefined;
}

function App() {
  const [weights, setWeights] = useState<Weight[]>([]);
  const [showWeightsList, setShowWeightsList] = useState(true);
  const [newWeight, setNewWeight] = useState("");
  const [reload, setReload] = useState(false);

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
