import { recommend } from "../controllers/recommendation_controller.js";
import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

import express from "express";

const router = express.Router();

//get recommendation for a batch
/**
 * @swagger
 * /api/recommendation/{batch_id}:
 *   get:
 *     summary: Get batch recommendation
 *     description: Returns recommendation based on batch age and total waste
 *     tags: [Recommendation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: batch_id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64f1a2b3c4d5e6f7g8h9i0"
 *     responses:
 *       200:
 *         description: Recommendation generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendation:
 *                   type: string
 *                   example: "Harvest now"
 *       404:
 *         description: Batch not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:batch_id", auth_middleware, roleAuthorization("farmer"),  recommend);

export default router;