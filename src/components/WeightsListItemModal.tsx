import styles from "./WeightsListItemModal.module.css";
import weightService from "../services/weights";

interface WeightsListItemModalProps {
  id: string;
  weights: { id: string; weight: number }[];
  weight: number;
  setWeights: React.Dispatch<
    React.SetStateAction<{ id: string; weight: number }[]>
  >;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WeightsListItemModal({
  id,
  weights,
  weight,
  setWeights,
  setOpenModal,
  setReload,
}: WeightsListItemModalProps) {
  function handleDelete() {
    console.log(id);

    weightService.deleteWeight(id).then(() => {
      setWeights((prevWeights) => prevWeights.filter((w) => w.id !== id));
    });
    setOpenModal(false);
    setReload((prev) => !prev);
  }

  return (
    <div className={styles.modalContainer}>
      <p>{weight} kg</p>
      <div className={styles.buttonsContainer}>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
}
