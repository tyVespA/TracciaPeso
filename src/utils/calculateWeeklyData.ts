export default function calculateWeeklyData(array: Weight[]) {
  const size = 7;

  function chunkArray<T>(array: T[], size: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  function averageChunks(array: Weight[], size: number) {
    return chunkArray(array, size).map((chunk, index) => {
      const validWeights = chunk
        .map((entry) => entry.weight) // Extract weight values
        .filter((weight) => typeof weight === "number"); // Ignore invalid values

      if (validWeights.length === 0)
        return { name: `Week ${index + 1}`, weight: 0 };

      const sum = validWeights.reduce((acc, weight) => acc + weight, 0);
      return {
        name: `Week ${index + 1}`,

        weight: Math.round((sum / validWeights.length) * 10) / 10, // Average weight
      };
    });
  }

  return averageChunks(array, size);
}
