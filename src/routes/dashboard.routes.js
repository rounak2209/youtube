import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashboard.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/dashboard/stats:
 *   get:
 *     summary: Get channel statistics
 *     description: Retrieves total video views, total subscribers, total videos, and total combined likes (from videos, comments, and tweets) for the authenticated user's channel.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Channel stats fetched successfully
 */
router.route("/stats").get(getChannelStats);

/**
 * @swagger
 * /api/v1/dashboard/videos:
 *   get:
 *     summary: Get all channel videos
 *     description: Retrieves a list of all videos uploaded by the authenticated user's channel, sorted by the most recent first.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Channel videos fetched successfully
 */
router.route("/videos").get(getChannelVideos);

export default router;