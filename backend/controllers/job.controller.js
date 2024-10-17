import { Job } from "../models/job.model.js";

// Middleware (example) to ensure req.id is populated (authentication logic).
// Make sure you're using an actual authentication middleware in your app.
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    // Assuming you have a function to decode the token and get user ID
    const decodedToken = decodeToken(token); // Replace with actual token decoding logic
    req.id = decodedToken.userId; // Attach user/admin ID to req
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token", success: false });
  }
};

// Admin post a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id; // Ensure req.id is populated from middleware

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    // Ensure requirements is an array or convert to array
    const formattedRequirements = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map((req) => req.trim());

    // Validate salary to be a number
    if (isNaN(Number(salary))) {
      return res.status(400).json({
        message: "Invalid salary format",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: formattedRequirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error in postJob:", error.message, error.stack);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// For students: Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company") // Populate company details
      .populate("created_by") // Populate user/admin details
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error.message, error.stack);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// For students: Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate("company") // Populate company details
      .populate("created_by") // Populate user/admin details
      .populate("applications"); // Populate applications if needed

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error in getJobById:", error.message, error.stack);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Admin: Get all jobs created by the admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate("company") // Populate company details
      .sort({ createdAt: -1 }); // Sort jobs by creation date

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAdminJobs:", error.message, error.stack);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
