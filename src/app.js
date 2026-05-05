import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// 1. Swagger packages import karo
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

// --- SWAGGER CONFIGURATION START ---
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'YouTube Backend API',
            version: '1.0.0',
            description: 'Complete API documentation for the YouTube clone backend project.',
        },
        servers: [
            {
                url: '/', // Dhyan rahe ye aapke .env wale PORT se match kare
                description: 'Local Development Server'
            }
        ]
    },
    // Ye line Swagger ko batati hai ki usko comments kahan dhoondhne hain.
    // Kyunki aapka app.js routes folder ke theek bahar hai, isliye path './routes/*.js' rahega.
    apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 2. Swagger UI ka route yahan mount kiya gaya hai
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- SWAGGER CONFIGURATION END ---


// routes import
import userRouter from './routes/user.routes.js';
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register
export {app};