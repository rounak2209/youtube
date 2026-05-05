import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/tweets:
 *   post:
 *     summary: Create a new tweet
 *     description: Add a new tweet for the currently authenticated user.
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The text content of the tweet
 *                 example: "Hello world! This is my first tweet on this platform."
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *       400:
 *         description: Content is required
 */
router.route("/").post(createTweet);

/**
 * @swagger
 * /api/v1/tweets/user/{userId}:
 *   get:
 *     summary: Get all tweets of a user
 *     description: Retrieve a list of tweets created by a specific user, sorted from newest to oldest.
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose tweets are to be fetched
 *     responses:
 *       200:
 *         description: User tweets fetched successfully
 *       400:
 *         description: Invalid userId
 *       404:
 *         description: No user found
 */
router.route("/user/:userId").get(getUserTweets);

/**
 * @swagger
 * /api/v1/tweets/{tweetId}:
 *   patch:
 *     summary: Update a tweet
 *     description: Modify the content of an existing tweet. A user can only update their own tweets.
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tweet to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated text content
 *                 example: "This is my updated tweet content!"
 *     responses:
 *       200:
 *         description: Tweet updated successfully
 *       400:
 *         description: Invalid tweetId or missing content
 *       404:
 *         description: Tweet not found (or unauthorized to update)
 */
/**
 * @swagger
 * /api/v1/tweets/{tweetId}:
 *   delete:
 *     summary: Delete a tweet
 *     description: Remove a tweet by its ID. A user can only delete their own tweets.
 *     tags: [Tweets]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tweet to be deleted
 *     responses:
 *       200:
 *         description: Tweet deleted successfully
 *       400:
 *         description: Invalid tweetId
 *       404:
 *         description: Tweet not found (or unauthorized to delete)
 */
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;