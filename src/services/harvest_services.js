import Batch from "../models/batch.js";

export const harvest_batch = async (data) => {
  const batch = await Batch.findById(data);

  batch.status = "harvested";
  await batch.save();

  return batch;
};
