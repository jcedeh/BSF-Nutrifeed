import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
    batch_code: {
        type: String,
        required: true,
        unique: true 
    },
    start_date: {
        type: Date,
        default: Date.now,
        required: true 
    },
    total_waste: {
        type: Number,
        required: true 
    },
    larva_quantity: {
        type: Number,
        required: true 
    },
    status: {
        type: String,
        enum: ['active', 'harvested'],
        default: 'active',
        required: true 
    },
    total_harvested: {
        type: Number,
        default: 0 
    }
},
    {
        timestamps: true,
        versionKey: false 
    }
);

const Batch = mongoose.model('Batch', batchSchema);
export default Batch;