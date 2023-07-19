import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://${HOST}:${PORT}`.yellow.bold
  )
);

export default app;
