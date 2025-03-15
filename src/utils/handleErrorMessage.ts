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
    error = "Type a weight before submitting";
  } else if (isNaN(Number(newWeight))) {
    error = "Weight can't contain letters";
  } else if (Number(newWeight) < 0) {
    error = "Weight can't be less than 0";
  } else if (Number(newWeight) > 299) {
    error = "Weight can't be more than 300";
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
