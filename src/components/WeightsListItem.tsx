import formatWeight from "../utils/formatWeight";

interface WeightsListItemProps {
  key: string;
  weight: number;
}

export default function WeightsListItem({ key, weight }: WeightsListItemProps) {
  return <p key={key}>{formatWeight(weight)} kg</p>;
}
