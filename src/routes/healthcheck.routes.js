
import { Router } from 'express';
import { healthcheck } from "../controllers/healthcheck.controller.js"

const router = Router();
/**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     summary: Check API health
 *     description: Returns the status of the API
 *     tags: [Healthcheck]
 *     responses:
 *       200:
 *         description: API is perfectly working
 */
router.route('/').get(healthcheck);

export default router
