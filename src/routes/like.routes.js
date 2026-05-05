import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/likes/toggle/v/{videoId}:
 *   post:
 *     summary: Toggle like on a video
 *     description: Like or unlike a specific video. If the video is already liked by the user, it removes the like.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to toggle like
 *     responses:
 *       200:
 *         description: Video liked or unliked successfully
 *       400:
 *         description: Invalid videoId
 *       404:
 *         description: Video not found
 */
router.route("/toggle/v/:videoId").post(toggleVideoLike);

/**
 * @swagger
 * /api/v1/likes/toggle/c/{commentId}:
 *   post:
 *     summary: Toggle like on a comment
 *     description: Like or unlike a specific comment.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to toggle like
 *     responses:
 *       200:
 *         description: Comment liked or unliked successfully
 *       400:
 *         description: Invalid commentId
 *       404:
 *         description: Comment not found
 */
router.route("/toggle/c/:commentId").post(toggleCommentLike);

/**
 * @swagger
 * /api/v1/likes/toggle/t/{tweetId}:
 *   post:
 *     summary: Toggle like on a tweet
 *     description: Like or unlike a specific tweet.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tweet to toggle like
 *     responses:
 *       200:
 *       201:
 *         description: Tweet liked or unliked successfully
 *       400:
 *         description: Invalid tweetId
 *       404:
 *         description: Tweet not found
 */
router.route("/toggle/t/:tweetId").post(toggleTweetLike);

/**
 * @swagger
 * /api/v1/likes/videos:
 *   get:
 *     summary: Get all liked videos
 *     description: Retrieve a list of all videos liked by the currently authenticated user.
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: All liked videos fetched successfully
 */
router.route("/videos").get(getLikedVideos);

export default router;