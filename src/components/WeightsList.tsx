import formatWeight from "../utils/formatWeight";
import styles from "./WeightsList.module.css";
import WeightsListItem from "./WeightsListItem";

interface Weight {
  weight: number;
  id: string;
}

interface WeightsListProps {
  weights: Weight[];
  setWeights: (weights: Weight[]) => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WeightsList({
  weights,
  setWeights,
  setReload,
}: WeightsListProps) {
  return (
    <div className={styles.weightsGrid}>
      {weights.map((dataPoint) => (
        <WeightsListItem
          key={dataPoint.id}
          id={dataPoint.id}
          weights={weights}
          weight={dataPoint.weight}
          setWeights={setWeights}
          setReload={setReload}
        />
      ))}
    </div>
  );
}
