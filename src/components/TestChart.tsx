import styles from "./TestChart.module.css";
import { useEffect, useState } from "react";
import weightService from "../services/weights";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TestChart({ reload }: { reload: boolean }) {
  const [weights, setWeights] = useState<Weight[]>([]);

  useEffect(() => {
    weightService.getAll().then((res) => {
      console.log(res.data);
      setWeights(res.data);
    });
  }, [reload]);

  // const data2 = [
  //   { weight: 70.1 },
  //   { weight: 70.0 },
  //   { weight: 69.8 },
  //   { weight: 68 },
  //   { weight: 69 },
  //   { weight: 74 },
  //   { weight: 72 },
  // ];

  const minWeight = Math.floor(Math.min(...weights.map((d) => d.weight))) - 1;
  const maxWeight = Math.ceil(Math.max(...weights.map((d) => d.weight))) + 1;

  return (
    <div className={styles.chartDiv}>
      <LineChart
        width={400}
        height={300}
        data={weights}
        // margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          strokeWidth={3}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3 " />
        <XAxis dataKey="name" />
        <YAxis
          domain={[minWeight, maxWeight]}
          tickCount={maxWeight - minWeight + 1}
          interval={0}
        />

        <Tooltip />
      </LineChart>
    </div>
  );
}
