import { harvest } from "../controllers/harvest_controller.js";

import express from "express";

const router = express.Router();

router.post("/", harvest);

export default router;