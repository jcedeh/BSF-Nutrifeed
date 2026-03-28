import Batch from "../models/batch.js";

export const create_batch = async (data) => {
    const {
        
        start_date,
        total_waste,
        larva_quantity
    } = data;

    if (!start_date || !total_waste || !larva_quantity) {
        throw new Error("All fields are required");
    }   
    const batch = await Batch.create(data);
    return batch
};

//get batch by id
export const get_batch = async (id) => {
  const batch = await Batch.findById(id);

  return batch;
};

//get all batches
export const get_all_batches = async () => {
  const batches = await Batch.find();   
    return batches; 
};

//update batch
export const update_batch = async (id, data) => {
  const batch = await Batch.findByIdAndUpdate(id, data, { new: true });

  return batch;
}

//delete batch
export const delete_batch = async (id) => {
  await Batch.findByIdAndDelete(id);
  return;
}   