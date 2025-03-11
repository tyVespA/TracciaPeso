import axios from "axios";
import { useEffect, useState } from "react";
import weightService from "./services/weights";
import formatWeight from "./utils/formatWeight";
import "./App.css";

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
    <>
      <h1>Weight tracker</h1>
      <div>
        {data.map((dataPoint) => (
          <p>{formatWeight(dataPoint.weight)} kg</p>
        ))}
      </div>
      <form action="" onSubmit={addWeight}>
        <input
          type="text"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
        />
        <button>add today's weight</button>
      </form>
    </>
  );
}

export default App;
