import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config("../.env");

const app = express();
const PORT = process.env.PORT || 8000;
const _dirname = path.resolve();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://jobbler-1.onrender.com", // Adjust as necessary
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files from the React app
app.use(express.static(path.join(_dirname, "viewfront", "dist")));

// Catch-all route to serve the React app for any unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "viewfront", "dist", "index.html"));
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Connect to the database and start the server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
