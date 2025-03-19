interface HandleErrorMessageProps {
  newWeight: string | number;
  setErrorMessage: (message: string) => void;
  setErrorState: (state: boolean) => void;
}

export default function handleErrorMessage({
  newWeight,
  setErrorMessage,
  setErrorState,
}: HandleErrorMessageProps): boolean {
  let error = "";

  if (newWeight === null || newWeight === undefined || newWeight === "") {
    error = "Inserisci il peso prima di inviare";
  } else if (isNaN(Number(newWeight))) {
    error = "Il peso non può contenere lettere";
  } else if (Number(newWeight) < 0) {
    error = "Il peso non può essere minore di 0";
  } else if (Number(newWeight) > 299) {
    error = "Il peso non può essere maggiore di 300";
  }

  if (error) {
    setErrorMessage(error);
    setErrorState(true);

    setTimeout(() => {
      setErrorState(false);
    }, 2500);

    return false;
  }

  return true;
}
