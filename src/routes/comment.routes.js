import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/comments/{videoId}:
 *   get:
 *     summary: Get all comments for a video
 *     description: Retrieve a paginated list of comments for a specific video.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of comments per page
 *     responses:
 *       200:
 *         description: Comments for a video fetched successfully
 *       400:
 *         description: Invalid video id provided
 *       404:
 *         description: Video does not exist
 */
/**
 * @swagger
 * /api/v1/comments/{videoId}:
 *   post:
 *     summary: Add a comment to a video
 *     description: Create a new comment on a specific video.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to comment on
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
 *                 example: "This is a great video!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Content is required or Invalid video ID
 */
router.route("/:videoId").get(getVideoComments).post(addComment);

/**
 * @swagger
 * /api/v1/comments/c/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     description: Modify the text content of an existing comment.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
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
 *                 example: "Updated comment text here."
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid comment id or missing content
 */
/**
 * @swagger
 * /api/v1/comments/c/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Remove a specific comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Invalid comment id
 *       404:
 *         description: Comment not found
 */
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;