import { Router } from 'express';
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();   

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - username
 *               - password
 *               - avatar
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: User profile image (Required)
 *               coverImage:
 *                 type: string
 *                 format: binary
 *                 description: Channel cover image (Optional)
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: All fields are required or User already exists
 */
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 }, 
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: rounak@example.com
 *               username:
 *                 type: string
 *                 example: rounak2209
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Invalid user credentials
 */
router.route("/login").post(loginUser);

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.route("/logout").post(verifyJWT, logoutUser);

/**
 * @swagger
 * /api/v1/users/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Access token refreshed
 *       401:
 *         description: Invalid or expired refresh token
 */
router.route("/refresh-token").post(refreshAccessToken);

/**
 * @swagger
 * /api/v1/users/change-password:
 *   post:
 *     summary: Change current password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid old password
 */
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

/**
 * @swagger
 * /api/v1/users/current-user:
 *   get:
 *     summary: Get current logged-in user details
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User fetched successfully
 */
router.route("/current-user").get(verifyJWT, getCurrentUser);

/**
 * @swagger
 * /api/v1/users/update-account:
 *   patch:
 *     summary: Update account details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account details updated successfully
 */
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

/**
 * @swagger
 * /api/v1/users/avatar:
 *   patch:
 *     summary: Update user avatar
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar image updated successfully
 */
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

/**
 * @swagger
 * /api/v1/users/cover-image:
 *   patch:
 *     summary: Update user cover image
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - coverImage
 *             properties:
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cover image updated successfully
 */
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

/**
 * @swagger
 * /api/v1/users/c/{username}:
 *   get:
 *     summary: Get user channel profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the channel
 *     responses:
 *       200:
 *         description: User channel fetched successfully
 *       404:
 *         description: Channel does not exist
 */
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

/**
 * @swagger
 * /api/v1/users/history:
 *   get:
 *     summary: Get user watch history
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Watch history fetched successfully
 */
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;