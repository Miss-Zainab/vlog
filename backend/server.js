require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middleware (must come before the routes)
app.use(cors()); // lets the React app (different port) call this API
app.use(express.json());

// Test route (Task 2)
app.get("/", (req, res) => {
  res.send("Blog API is running");
});

// Blog API (Task 3)
app.use("/api/blogs", blogRoutes);

// Unknown routes -> 404 JSON
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
