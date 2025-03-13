import { useEffect, useState, FormEvent } from "react";
import weightService from "./services/weights";
import formatWeight from "./utils/formatWeight";
import styles from "./App.module.css";
import TestChart from "./components/TestChart";

interface Weight {
  weight: number;
  id: number;
}

function App() {
  const [weights, setWeights] = useState<Weight[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    weightService.getAll().then((res) => {
      console.log(res.data);
      setWeights(res.data);
    });
  }, []);

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
        <div>
          {weights.map((dataPoint) => (
            <p key={dataPoint.id}>{formatWeight(dataPoint.weight)} kg</p>
          ))}
        </div>
        <form action="" onSubmit={addWeight} className={styles.form}>
          <input
            type="text"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
          />
          <button>add today's weight</button>
        </form>
      </main>
      <div className={styles.chartsContainer}>
        <TestChart reload={reload} />
        <TestChart reload={reload} />
      </div>
    </div>
  );
}

export default App;
