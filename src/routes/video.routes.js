import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/videos:
 *   get:
 *     summary: Get all videos
 *     description: Fetch all published videos with optional filtering, sorting, and pagination.
 *     tags: [Videos]
 *     parameters:
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
 *         description: Number of videos per page
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for video title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., createdAt, views)
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort direction
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter videos by user ID
 *     responses:
 *       200:
 *         description: Videos fetched successfully
 *       500:
 *         description: Failed to retrieve videos
 */
/**
 * @swagger
 * /api/v1/videos:
 *   post:
 *     summary: Publish a new video
 *     description: Upload a video file and thumbnail, and create a new video entry.
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - videoFile
 *               - thumbnail
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the video
 *               description:
 *                 type: string
 *                 description: Description of the video
 *               videoFile:
 *                 type: string
 *                 format: binary
 *                 description: Video file to upload (mp4, mkv, etc.)
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image for the video
 *     responses:
 *       201:
 *         description: Video published successfully
 *       400:
 *         description: Missing fields or files
 */
router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
        ]),
        publishAVideo
    );

/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to retrieve
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *       401:
 *         description: Invalid or missing video ID
 */
/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   delete:
 *     summary: Delete a video
 *     description: Delete a video by its ID. (Note - Currently this deletes from DB, Cloudinary deletion logic can be added later)
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to delete
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       400:
 *         description: Invalid video ID
 */
/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   patch:
 *     summary: Update video details
 *     description: Update the title, description, or thumbnail of an existing video.
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - thumbnail
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: New thumbnail image
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       400:
 *         description: Missing fields or invalid video ID
 *       500:
 *         description: Failed to upload or delete thumbnail
 */
router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

/**
 * @swagger
 * /api/v1/videos/toggle/publish/{videoId}:
 *   patch:
 *     summary: Toggle publish status
 *     description: Switch the isPublished status of a video between true and false.
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to toggle
 *     responses:
 *       200:
 *         description: Video publish status updated
 *       400:
 *         description: Invalid video ID
 */
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;