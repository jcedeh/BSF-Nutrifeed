import Batch from "../models/batch.js";
import { get_recommendation } from "../services/recommendation_service.js";

export const recommend = async (req, res) => {
  const batch = await Batch.findById(req.params.batch_id);

  const recommendation = get_recommendation(batch);

  res.status(200).json({
    recommendation
  });
}; 