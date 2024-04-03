import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import corsOptions from "./middlewares/corsConfig";
import todoRoutes from "./routes/todo.routes";
import otherRoutes from "./routes/other.routes";

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

app.use("/api", otherRoutes);

app.use("/api/todo", todoRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
