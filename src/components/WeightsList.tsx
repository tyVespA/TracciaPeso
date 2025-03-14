import formatWeight from "../utils/formatWeight";
import styles from "./WeightsList.module.css";

export default function WeightsList({ weights }) {
  console.log(weights.length);
  return (
    <div className={styles.weightsGrid}>
      {weights.map((dataPoint) => (
        <p key={dataPoint.id}>{formatWeight(dataPoint.weight)} kg</p>
      ))}
    </div>
  );
}
