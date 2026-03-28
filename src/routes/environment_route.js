import express from "express";
import { record_environment_controller } from "../controllers/environment_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

const router = express.Router();

//record environment data for a batch

/**
 * @swagger
 * /api/environment:
 *   post:
 *     summary: Record environment data
 *     description: Save temperature and humidity data for a specific batch
 *     tags: [Environment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batch_id
 *               - temperature
 *               - humidity
 *               - recorded_at
 *             properties:
 *               batch_id:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7g8h9i0"
 *               temperature:
 *                 type: number
 *                 example: 30.5
 *               humidity:
 *                 type: number
 *                 example: 75
 *               recorded_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-03-28T10:30:00Z"
 *     responses:
 *       201:
 *         description: Environment data recorded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth_middleware, roleAuthorization("farmer"), record_environment_controller);

export default router;