import styles from "./DailyChart.module.css";
import { useEffect, useState } from "react";
import weightService from "../../services/weights";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DailyChart({ reload }: { reload: boolean }) {
  const [weights, setWeights] = useState<Weight[]>([]);

  useEffect(() => {
    weightService.getAll().then((res) => {
      console.log(res.data);

      // Filter out invalid entries
      const cleanedData = res.data.filter(
        (item) => typeof item.weight === "number"
      );

      setWeights(cleanedData);
    });
  }, [reload]);

  const minWeight = Math.floor(Math.min(...weights.map((d) => d.weight))) - 1;
  const maxWeight = Math.ceil(Math.max(...weights.map((d) => d.weight))) + 1;

  return (
    <div>
      <h2 className={styles.title}>Pesi giornalieri</h2>
      <div className={styles.chartDiv}>
        <LineChart
          width={400}
          height={300}
          data={weights}
          // margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="linear"
            dataKey="weight"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <CartesianGrid stroke="#ebebeb25" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {/* <XAxis /> */}
          <YAxis
            domain={[minWeight, maxWeight]}
            tickCount={maxWeight - minWeight + 1}
            interval={0}
          />
          <Tooltip
            content={(props) => {
              const { payload } = props;
              if (payload && payload.length > 0) {
                const weight = payload[0].value;
                return (
                  <div>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        backgroundColor: "black",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >{`${weight} kg`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </div>
    </div>
  );
}
