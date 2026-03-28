import { create_batch,
        get_batch,
        get_all_batches,
        update_batch,
        delete_batch
    } from "../services/batch_services.js"; 
import { catchAsync } from "../utils/catchAsync.js";

//create batch controller
export const create_batch_controller = catchAsync(async(req, res) => {
    const {start_date, total_waste, larva_quantity } = req.body;
    const batch = await create_batch({ start_date, total_waste, larva_quantity });
    res.status(201).json({message: "Batch created successfully", data: batch});
});

//get batch by id controller
export const get_batch_controller = catchAsync(async(req, res) => {
    const { id } = req.params;
    const batch = await get_batch(id);
    if (!batch) {
        return res.status(404).json({message: "Batch not found"});
    }
    res.status(200).json({message: "Batch found", data: batch});
}); 

//get all batches controller
export const get_all_batches_controller = catchAsync(async(req, res) => {
    const batches = await get_all_batches();
    res.status(200).json({message: "Batches retrieved successfully", data: batches});
}); 

//update batch controller
export const update_batch_controller = catchAsync(async(req, res) => {
    const { id } = req.params;
    const { start_date, total_waste, larva_quantity} = req.body;
    const batch = await update_batch(id, { start_date, total_waste, larva_quantity });
    if (!batch) {
        return res.status(404).json({message: "Batch not found"});
    }
    res.status(200).json({message: "Batch updated successfully", data: batch});
});

//delete batch controller
export const delete_batch_controller = catchAsync(async(req, res) => {
    const { id } = req.params;
    await delete_batch(id);
    res.status(204).json({message: "Batch deleted successfully"});
}); 
