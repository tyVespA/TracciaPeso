import { useState } from "react";
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
  const [newWeight, setNewWeight] = useState(weight);

  function handleDelete() {
    console.log(id);

    weightService.deleteWeight(id).then(() => {
      setWeights((prevWeights) => prevWeights.filter((w) => w.id !== id));
    });
    setOpenModal(false);
    setReload((prev) => !prev);
  }

  function handleUpdate() {
    setOpenModal(false);
  }

  return (
    <div className={styles.modalWrapper}>
      <div
        className={styles.modalBackdrop}
        onClick={() => setOpenModal(false)}
      ></div>

      <div className={styles.modalContainer}>
        <p>Current weight: {weight}</p>
        <input
          type="text"
          inputMode="numeric"
          placeholder="New value for update"
          // value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          className={styles.weightInput}
        />
        <div className={styles.buttonsContainer}>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleUpdate}>update</button>
        </div>
      </div>
    </div>
  );
}
