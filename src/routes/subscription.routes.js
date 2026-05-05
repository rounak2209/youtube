import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/subscriptions/c/{channelId}:
 *   get:
 *     summary: Get channels subscribed by a user
 *     description: Retrieves a list of channels that the specified user (channelId) has subscribed to.
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose subscribed channels are to be fetched
 *     responses:
 *       200:
 *         description: Channel subscribed list fetched successfully
 *       400:
 *         description: Invalid channelId
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /api/v1/subscriptions/c/{channelId}:
 *   post:
 *     summary: Toggle subscription to a channel
 *     description: Subscribe or unsubscribe the currently logged-in user to/from the specified channel.
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the channel to toggle subscription for
 *     responses:
 *       200:
 *         description: Subscribed/Unsubscribed successfully
 *       400:
 *         description: Invalid channelId or attempting to subscribe to own channel
 *       404:
 *         description: Channel not found
 */
router
    .route("/c/:channelId")
    .get(getSubscribedChannels)
    .post(toggleSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/u/{subscriberId}:
 *   get:
 *     summary: Get subscribers of a channel
 *     description: Retrieves a list of users who have subscribed to the specified channel (subscriberId).
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the channel whose subscribers are to be fetched
 *     responses:
 *       200:
 *         description: Subscriber list fetched successfully
 *       400:
 *         description: Invalid user ID format
 *       404:
 *         description: User not found
 */
router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router;