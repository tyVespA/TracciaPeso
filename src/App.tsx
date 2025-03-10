import axios from "axios";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/data").then((res) => {
      console.log("promise fullfilled");
      setData(res.data);
    });
  }, []);
  console.log("render", data.length, "data points");

  function formatWeight(weight: number) {
    return weight % 1 === 0 ? `${weight}.0` : `${weight}`;
  }

  return (
    <>
      <h1>Weight tracker</h1>
      <img src={reactLogo} alt="" />
      {data.map((dataPoint) => (
        <p>{formatWeight(dataPoint.weight)} kg</p>
      ))}
    </>
  );
}

export default App;
