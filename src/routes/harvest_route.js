import { harvest,
    get_harvest_history,
    update_harvest_controller,
    delete_harvest_controller
 } from "../controllers/harvest_controller.js";
 import {auth_middleware} from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

import express from "express";

const router = express.Router();

//create harvest record for a batch
/**
 * @swagger
 * /api/harvests:
 *   post:
 *     summary: Record a harvest
 *     tags: [Harvest]
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
 *               - harvest_date
 *               - harvest_weight
 *             properties:
 *               batch_id:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7g8h9i0"
 *               harvest_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-28"
 *               harvest_weight:
 *                 type: number
 *                 example: 120
 *     responses:
 *       201:
 *         description: Harvest recorded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth_middleware, roleAuthorization("farmer"), harvest);

/**
 * @swagger
 * /api/harvests:
 *   get:
 *     summary: Get harvest history
 *     tags: [Harvest]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of harvest records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   batch_id:
 *                     type: string
 *                   harvest_date:
 *                     type: string
 *                     format: date
 *                   harvest_weight:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth_middleware, roleAuthorization("farmer"), get_harvest_history);

//update harvest record
/**
 * @swagger
 * /api/harvests/{id}:
 *   put:
 *     summary: Update harvest record
 *     tags: [Harvest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batch_id:
 *                 type: string
 *               harvest_date:
 *                 type: string
 *                 format: date
 *               harvest_weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: Harvest updated successfully
 *       404:
 *         description: Harvest not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:batch_id", auth_middleware, roleAuthorization("farmer"), update_harvest_controller);

/**
 * @swagger
 * /api/harvests/{id}:
 *   delete:
 *     summary: Delete harvest record
 *     tags: [Harvest]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Harvest deleted successfully
 *       404:
 *         description: Harvest not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:batch_id", auth_middleware, roleAuthorization("farmer"), delete_harvest_controller);

export default router;