import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/dbConn.js";
import blogRouter from './routes/blog.js';
import userRouter from './routes/auth.js';
import multer from "multer";



config();
const app = express();
const PORT = process.env.PORT || 5500;
//connect to mongodb
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
//to parse json
app.use(express.json());
app.use("/images", express.static("./images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File has been uploaded");
});

// routes
app.use("/auth",userRouter);
app.use("/blog",blogRouter);

app.use(express.static("build"));
app.get("/", (req, res) => res.send("./public/index.html"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});