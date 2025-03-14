import { useState } from "react";
import styles from "./WeightsListItem.module.css";
import formatWeight from "../utils/formatWeight";
import WeightsListItemModal from "./WeightsListItemModal";

interface WeightsListItemProps {
  id: string;
  weight: number;
  weights: { id: string; weight: number }[];
  setWeights: (weights: { id: string; weight: number }[]) => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WeightsListItem({
  id,
  weights,
  weight,
  setWeights,
  setReload,
}: WeightsListItemProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        key={id}
        className={styles.button}
        onClick={() => {
          setOpenModal(!openModal);
          console.log(openModal);
          console.log(id);
        }}
      >
        {formatWeight(weight)} kg
      </button>
      {openModal ? (
        <WeightsListItemModal
          id={id}
          weights={weights}
          weight={weight}
          setWeights={setWeights}
          setOpenModal={setOpenModal}
          setReload={setReload}
        />
      ) : (
        ""
      )}
    </>
  );
}
