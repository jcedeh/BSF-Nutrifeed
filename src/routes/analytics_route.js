import { analytics } from "../controllers/analytics_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

import express from "express";

const router = express.Router();

//get analytics data for dashboard
/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get system analytics
 *     description: Returns total number of batches and total waste recorded
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_batches:
 *                   type: number
 *                   example: 10
 *                 total_waste:
 *                   type: number
 *                   example: 250
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth_middleware, roleAuthorization("farmer"), analytics);

export default router;
