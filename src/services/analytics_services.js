import Batch from "../models/batch.js";

export const get_analytics = async () => {
  const batches = await Batch.find();

  const total_waste = batches.reduce((acc, b) => acc + b.total_waste, 0);

  return ({
    total_batches: batches.length,
    total_waste: total_waste    
  });
};