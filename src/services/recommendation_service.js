export const get_recommendation = (batch) => {
  const days = Math.floor(
    (Date.now() - batch.start_date) / (1000 * 60 * 60 * 24)
  );

  if (days >= 14) return "Harvest now";
  if (batch.total_waste < 20) return "Add more waste";

  return "Maintain current conditions";
};