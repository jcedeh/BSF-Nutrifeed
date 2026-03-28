import { feed_batch,
    get_feed_history,
    update_feed,
    delete_feed     
 } from "../services/feed_service.js";

import express from "express";

const router = express.Router();

router.post("/", feed_batch);
router.get("/:batch_id", get_feed_history);
router.put("/:feed_id", update_feed);
router.delete("/:feed_id", delete_feed);

export default router;
