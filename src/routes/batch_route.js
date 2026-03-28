import express from "express";
import { create_batch_controller,
        get_batch_controller,
        get_all_batches_controller,
        update_batch_controller,
        delete_batch_controller
 } from "../controllers/batch_controller.js";

import { auth_middleware } from "../middlewares/auth_middleware.js";
import { roleAuthorization } from "../middlewares/role_authorization.js";
const router = express.Router();

// Batch routes

/**
 * @swagger
 * /api/batches:
 *   post:
 *     summary: Create a new batch
 *     tags: [Batch]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_date
 *               - total_waste
 *               - larva_quantity
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-28"
 *               total_waste:
 *                 type: number
 *                 example: 50
 *               larva_quantity:
 *                 type: number
 *                 example: 2000
 *     responses:
 *       201:
 *         description: Batch created successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/", auth_middleware, roleAuthorization("farmer"), create_batch_controller);

//get all batches
/**
 * @swagger
 * /api/batches:
 *   get:
 *     summary: Get all batches
 *     tags: [Batch]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of batches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   start_date:
 *                     type: string
 *                     format: date
 *                   total_waste:
 *                     type: number
 *                   larva_quantity:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */

router.get("/", auth_middleware, roleAuthorization("farmer"), get_all_batches_controller);
//get batch by id
/**
 * @swagger
 * /api/batches/{id}:
 *   get:
 *     summary: Get batch by ID
 *     tags: [Batch]
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
 *         description: Batch found
 *       404:
 *         description: Batch not found
 *       401:
 *         description: Unauthorized
 */

router.get("/:id", auth_middleware, roleAuthorization("farmer"), get_batch_controller);

//update batch
/**
 * @swagger
 * /api/batches/{id}:
 *   put:
 *     summary: Update a batch
 *     tags: [Batch]
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
 *               start_date:
 *                 type: string
 *                 format: date
 *               total_waste:
 *                 type: number
 *               larva_quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Batch updated successfully
 *       404:
 *         description: Batch not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", auth_middleware, roleAuthorization("farmer"), update_batch_controller);

//delete batch
/**
 * @swagger
 * /api/batches/{id}:
 *   delete:
 *     summary: Delete a batch
 *     tags: [Batch]
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
 *         description: Batch deleted successfully
 *       404:
 *         description: Batch not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", auth_middleware, roleAuthorization("farmer"), delete_batch_controller);




export default router;