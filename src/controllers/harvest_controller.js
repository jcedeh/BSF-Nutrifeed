import { harvest_batch } from "../services/harvest_services.js";

export const harvest = async (req, res) => {
  const { batch_id } = req.body;
  const batch = await harvest_batch(batch_id);
  res.status(200).json({ message: "Batch harvested", batch });
};