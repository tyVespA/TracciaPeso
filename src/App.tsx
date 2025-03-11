import { useEffect, useState } from "react";
import weightService from "./services/weights";
import formatWeight from "./utils/formatWeight";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState([]);
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => {
    weightService.getAll().then((res) => {
      setData(res.data);
    });
  }, []);

  function addWeight(e) {
    e.preventDefault();
    const newWeightObject = {
      weight: newWeight,
    };
    weightService.create(newWeightObject).then((res) => {
      setData(data.concat(res.data));
      setNewWeight("");
    });
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Weight tracker</h1>
        <div>
          {data.map((dataPoint) => (
            <p>{formatWeight(dataPoint.weight)} kg</p>
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
    </div>
  );
}

export default App;
