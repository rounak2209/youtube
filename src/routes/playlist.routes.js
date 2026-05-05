import { Router } from 'express';
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/playlist:
 *   post:
 *     summary: Create a new playlist
 *     description: Creates a new playlist for the authenticated user.
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Favorite Videos"
 *               description:
 *                 type: string
 *                 example: "A collection of my top picks."
 *     responses:
 *       201:
 *         description: New playlist created successfully
 *       400:
 *         description: All fields are required
 *       409:
 *         description: Playlist with this name already exists
 */
router.route("/").post(createPlaylist);

/**
 * @swagger
 * /api/v1/playlist/{playlistId}:
 *   get:
 *     summary: Get a playlist by ID
 *     description: Retrieves details of a specific playlist, including the videos inside it.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist
 *     responses:
 *       200:
 *         description: Playlist fetched successfully
 *       400:
 *         description: Invalid playlistId
 *       404:
 *         description: Playlist not found
 */
/**
 * @swagger
 * /api/v1/playlist/{playlistId}:
 *   patch:
 *     summary: Update a playlist
 *     description: Modifies the name or description of a playlist owned by the authenticated user.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Playlist Name"
 *               description:
 *                 type: string
 *                 example: "Updated description text."
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       400:
 *         description: Invalid playlistId or no fields provided
 *       404:
 *         description: Playlist not found
 *       409:
 *         description: Playlist with this name already exists
 */
/**
 * @swagger
 * /api/v1/playlist/{playlistId}:
 *   delete:
 *     summary: Delete a playlist
 *     description: Deletes a playlist owned by the authenticated user.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       400:
 *         description: Invalid playlistId
 *       404:
 *         description: Playlist not found or permission denied
 */
router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

/**
 * @swagger
 * /api/v1/playlist/add/{videoId}/{playlistId}:
 *   patch:
 *     summary: Add a video to a playlist
 *     description: Adds an existing video to the user's playlist.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to add
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist
 *     responses:
 *       200:
 *         description: Video added successfully
 *       400:
 *         description: Invalid playlistId or videoId
 *       404:
 *         description: Video or Playlist not found
 */
router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);

/**
 * @swagger
 * /api/v1/playlist/remove/{videoId}/{playlistId}:
 *   patch:
 *     summary: Remove a video from a playlist
 *     description: Removes a specific video from the user's playlist.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to remove
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist
 *     responses:
 *       200:
 *         description: Video removed successfully
 *       400:
 *         description: Invalid playlistId or videoId
 *       404:
 *         description: Playlist not found
 */
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

/**
 * @swagger
 * /api/v1/playlist/user/{userId}:
 *   get:
 *     summary: Get user playlists
 *     description: Retrieves all playlists created by a specific user.
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User playlist fetched successfully
 *       400:
 *         description: Invalid userId
 */
router.route("/user/:userId").get(getUserPlaylists);

export default router;