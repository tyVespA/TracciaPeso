export default function formatWeight(weight: number) {
  return weight % 1 === 0 ? `${weight}.0` : `${weight}`;
}
