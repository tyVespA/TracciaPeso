import { useState, useEffect, FormEvent } from "react";
import styles from "./WeightsListItemModal.module.css";
import weightService from "../../services/weights";
import Error from "../Error";
import handleErrorMessage from "../../utils/handleErrorMessage";

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
  // weights,
  weight,
  setWeights,
  setOpenModal,
  setReload,
}: WeightsListItemModalProps) {
  const [newWeight, setNewWeight] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorState, setErrorState] = useState<boolean>(false);

  function handleDelete() {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this entry?")) {
      weightService.deleteWeight(id).then(() => {
        setWeights((prevWeights) => prevWeights.filter((w) => w.id !== id));
        setOpenModal(false);
        setReload((prev) => !prev);
      });
    } else {
      setOpenModal(false);
    }
  }

  function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newWeight && Number(newWeight) === weight) {
      return setOpenModal(false);
    }

    const isValid = handleErrorMessage({
      newWeight,
      setErrorMessage,
      setErrorState,
    });

    if (isValid) {
      weightService.updateById(id, Number(newWeight)).then(() => {
        setWeights((prevWeights) =>
          prevWeights.map((w) =>
            w.id === id ? { ...w, weight: Number(newWeight) } : w
          )
        );
        setOpenModal(false);
        setReload((prev) => !prev);
      });
    }
  }

  return (
    <div className={styles.modalWrapper}>
      <div
        className={styles.modalBackdrop}
        onClick={() => setOpenModal(false)}
      ></div>
      <div className={styles.modalContainer}>
        <Error errorMessage={errorMessage} errorState={errorState} />
        <p>Current weight: {weight} kg</p>
        <form action="" onSubmit={handleUpdate}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="New weight"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className={styles.weightInput}
          />
        </form>
        <div className={styles.buttonsContainer}>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
