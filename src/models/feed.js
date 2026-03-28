import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',   
        required: true
    },
    feed_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    waste_amount: {
        type: Number,
        required: true
    }
},
    { timestamps: true, versionKey: false }
);  
const Feed = mongoose.model('Feed', feedSchema);
export default Feed;