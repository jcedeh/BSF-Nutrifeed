import { recommend } from "../controllers/recommendation_controller.js";

import express from "express";

const router = express.Router();

router.get("/:batch_id", recommend);

export default router;