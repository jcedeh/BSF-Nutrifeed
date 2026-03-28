import { analytics } from "../controllers/analytics_controller.js";

import express from "express";

const router = express.Router();

router.get("/", analytics);

export default router;
