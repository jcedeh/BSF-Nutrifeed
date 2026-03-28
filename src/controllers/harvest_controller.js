import { harvest_batch_services,
    get_harvest_history_services,
    update_harvest_services,
    delete_harvest_services
 } from "../services/harvest_services.js";

export const harvest = async (req, res) => {
  const { batch_id, harvest_date, harvest_weight } = req.body;
  const batch = await harvest_batch({ batch_id, harvest_date, harvest_weight });
  res.status(200).json({ message: "Batch harvested", batch });
};

//get harvest history for a batch
export const get_harvest_history = async (req, res) => {
  const { batch_id } = req.params;
    const harvest_history = await get_harvest_history(batch_id);
    res.status(200).json({ message: "Harvest history retrieved", harvest_history });
};

//update harvest record
export const update_harvest_controller = async (req, res) => {
    const { batch_id } = req.params;
    const data = req.body;
    const updated_harvest = await update_harvest(batch_id, data);
    res.status(200).json({ message: "Harvest record updated", updated_harvest });
};

//delete harvest record
export const delete_harvest_controller = async (req, res) => {
    const { batch_id } = req.params;
    await delete_harvest(batch_id);
    res.status(200).json({ message: "Harvest record deleted" });
};