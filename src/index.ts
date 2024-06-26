import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import corsOptions from "./middlewares/corsConfig";
import todoRoutes from "./routes/todo.routes";
import otherRoutes from "./routes/other.routes";
import { checkJwt } from "./middlewares/authMiddleware";
import {
  generalErrorHandler,
  notFoundHandler,
} from "./middlewares/errorMiddleware";
import { userInfo } from "./middlewares/getUserInfo";

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not set");
}

const port = process.env.PORT;
const app: Express = express();

// Logger Middleware
app.use(morgan("dev"));

// Middleware Setup
// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors(corsOptions));

// Routes

app.use(checkJwt);

app.use(userInfo);

app.use("/api", otherRoutes);

app.use("/api/todo", todoRoutes);

app.use(notFoundHandler);
app.use(generalErrorHandler);

// Start the Server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
