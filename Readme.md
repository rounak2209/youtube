#backend# YouTube Clone Backend API

A complete backend API for a video-sharing platform like YouTube. This project handles user accounts, video uploads, likes, comments, tweets, subscriptions, playlists, and a channel dashboard.

## Tech Stack

*   **Node.js & Express.js:** Backend server and routing.
*   **MongoDB & Mongoose:** Database and object data modeling.
*   **JWT (JSON Web Tokens):** For secure authentication and authorization.
*   **Cloudinary & Multer:** For handling image and video file uploads.
*   **Swagger UI:** For interactive API documentation.

## Core Features

*   **User Management:** Register, login, logout, change password, and update profile details (avatar and cover image).
*   **Video Management:** Upload, update, delete, and toggle publish status of videos.
*   **Tweets:** Create, read, update, and delete short text posts (tweets).
*   **Subscriptions:** Subscribe or unsubscribe to channels and view subscriber lists.
*   **Playlists:** Create playlists, add/remove videos, and manage playlist details.
*   **Likes:** Like or unlike videos, comments, and tweets.
*   **Comments:** Add, update, and delete comments on videos.
*   **Dashboard:** View channel statistics (total views, subscribers, total videos, and total likes).
*   **Pagination:** Load videos and comments in pages (limit and page number) to save data.

## API Documentation (Swagger)

This project includes complete API documentation using Swagger UI. You do not need Postman to test the APIs.

1. Start the server.
2. Open your browser and go to: `http://localhost:8000/api-docs`
3. You will see a list of all APIs. Click on any API, click **"Try it out"**, fill in the required details, and click **"Execute"** to test it directly from the browser.

## Getting Started

Follow these steps to run the project on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/rounak2209/youtube.git