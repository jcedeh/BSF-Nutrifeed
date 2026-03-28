import {    feed_batch,
            get_feed_history,
            update_feed,
            delete_feed
 } from "../services/feed_service.js";

export const feed_batch_controller = async (req, res) => {
  const { batch_id, waste } = req.body;
    const batch = await feed_batch({ batch_id, waste });    
    res.status(200).json({ message: "Feeding recorded", batch });
};

export const get_feed_history_controller = async (req, res) => {
  const { batch_id } = req.params;
    const feed_history = await get_feed_history(batch_id);
    res.status(200).json({ message: "Feed history retrieved", feed_history });
};

export const update_feed_controller = async (req, res) => {
    const { batch_id } = req.params;
    const waste = req.body;
    const updated_feed = await update_feed(batch_id, waste);
    res.status(200).json({ message: "Feed record updated", updated_feed });
};

export const delete_feed_controller = async (req, res) => {
    const { batch_id } = req.params;
    await delete_feed(batch_id);
    res.status(200).json({ message: "Feed record deleted" });
};




