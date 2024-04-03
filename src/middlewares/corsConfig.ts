import { CorsOptions } from "cors";

if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL environment variable is not set");
}

const whitelist = [process.env.CLIENT_URL || "http://localhost:3000"];

const corsOptions: CorsOptions = {
  origin: whitelist,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

export default corsOptions;
