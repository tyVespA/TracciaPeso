import formatWeight from "../utils/formatWeight";
import styles from "./WeightsList.module.css";
import WeightsListItem from "./WeightsListItem";

interface Weight {
  weight: number;
  id: string;
}

interface WeightsListProps {
  weights: Weight[];
}

export default function WeightsList({ weights }: WeightsListProps) {
  console.log(weights.length);
  return (
    <div className={styles.weightsGrid}>
      {weights.map((dataPoint) => (
        <WeightsListItem key={dataPoint.id} weight={dataPoint.weight} />
      ))}
    </div>
  );
}
