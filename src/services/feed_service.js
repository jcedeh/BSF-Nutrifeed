import Batch from "../models/batch.js";
import Feed from "../models/feed.js";

// Feed a batch with waste
export const feed_batch = async (data) => {
  const { batch_id, waste } = data;

  const batch = await Batch.findById(batch_id);

  batch.total_waste += waste;
  await batch.save();

  return  batch
};

// Get feed history for a batch
export const get_feed_history = async (batch_id) => {
  const batch = await Batch.findById(batch_id).populate('waste_amount');
  return batch.feeds;
};  

//update feed record
export const update_feed = async (feed_id, data) => {
  const feed = await Feed.findByIdAndUpdate(feed_id, data, { new: true });
  return feed;
}

//delete feed record
export const delete_feed = async (feed_id) => {
  await Feed.findByIdAndDelete(feed_id);
  return;
}   

