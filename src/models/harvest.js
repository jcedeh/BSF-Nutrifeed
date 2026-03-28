import mongoose from "mongoose";

const harvestSchema = new mongoose.Schema({
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    harvest_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    harvested_weight: {
        type: Number,
        required: true
    }
},
    { timestamps: true, versionKey: false }
);
const Harvest = mongoose.model('Harvest', harvestSchema);
export default Harvest; 
