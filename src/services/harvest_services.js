import Batch from "../models/batch.js";
import Harvest from "../models/harvest.js";

export const harvest_batch_services = async (data) => {
  const {batch_id, harvest_date, harvest_weight } = data;
  if(!batch_id || !harvest_date || !harvest_weight) {
    throw new Error("All fields are required");
  }
    const batch = await Batch.findById(batch_id);
    if(!batch) {
      throw new Error("Batch not found");
    }
    const harvest_record = await Harvest.create({
      batch: batch_id,
      harvest_date,
      harvest_weight
    });
    batch.status="harvested";
    await batch.save(); 
    return harvest_record;
};

//get harvest history for a batch
export const get_harvest_history_services = async (batch_id) => {
  const harvest_history = await Harvest.find({ batch: batch_id });
  return harvest_history;
};

//update harvest record
export const update_harvest_services = async (harvest_id, data) => {
  const updated_harvest = await Harvest.findByIdAndUpdate(harvest_id, data, { new: true });
  return updated_harvest;
};

//delete harvest record
export const delete_harvest_services = async (harvest_id) => {
  await Harvest.findByIdAndDelete(harvest_id);
  return;
}   
