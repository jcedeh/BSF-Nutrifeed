import { feed_batch,
    get_feed_history,
    update_feed,
    delete_feed     
 } from "../services/feed_service.js";
 import {auth_middleware} from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";

import express from "express";

const router = express.Router();

//feed a batch with waste
/**
 * @swagger
 * /api/feeds:
 *   post:
 *     summary: Feed a batch
 *     tags: [Feed]
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
 *               - waste
 *             properties:
 *               batch_id:
 *                 type: string
 *                 example: "64f1a2b3c4d5e6f7g8h9i0"
 *               waste:
 *                 type: number
 *                 example: 25
 *     responses:
 *       201:
 *         description: Feed recorded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth_middleware, roleAuthorization("farmer"), feed_batch);

//get feed history for a batch
/**
 * @swagger
 * /api/feeds:
 *   get:
 *     summary: Get feed history
 *     tags: [Feed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of feed records
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
 *                   waste:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get("/:batch_id", auth_middleware, roleAuthorization("farmer"), get_feed_history);

//update feed record
/**
 * @swagger
 * /api/feeds/{id}:
 *   put:
 *     summary: Update feed record
 *     tags: [Feed]
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
 *               waste:
 *                 type: number
 *     responses:
 *       200:
 *         description: Feed updated successfully
 *       404:
 *         description: Feed not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:feed_id", auth_middleware, roleAuthorization("farmer"), update_feed);

//delete feed record
/**
 * @swagger
 * /api/feeds/{id}:
 *   delete:
 *     summary: Delete feed record
 *     tags: [Feed]
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
 *         description: Feed deleted successfully
 *       404:
 *         description: Feed not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:feed_id", auth_middleware, roleAuthorization("farmer"), delete_feed);

export default router;
