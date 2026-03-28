import express from "express";
import { create_batch_controller,
        get_batch_controller,
        get_all_batches_controller,
        update_batch_controller,
        delete_batch_controller
 } from "../controllers/batch_controller.js";

import { auth_middleware } from "../middlewares/auth_middleware.js";
const router = express.Router();

// Batch routes
router.post("/", auth_middleware, create_batch_controller);
router.get("/:id", auth_middleware, get_batch_controller);
router.get("/", auth_middleware, get_all_batches_controller);
router.put("/:id", auth_middleware, update_batch_controller);
router.delete("/:id", auth_middleware, delete_batch_controller);

export default router;