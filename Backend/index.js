import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { connectDatabase } from "./config/database.js";
import { registerRoutes } from "./routes/index.js";
import { log, requestLogger } from "./middleware/logger.js";
import { seedPakistaniCities } from "./config/seedCities.js";

const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5000",
    credentials: true,
  })
);

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Request logger middleware
app.use(requestLogger);

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

// Register all routes
registerRoutes(app);

// Error handling middleware
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

// Start server
(async () => {
  try {
    await connectDatabase();

    // Seed Pakistani cities data (non-blocking)
    // seedPakistaniCities().catch(err => {
    //   console.error("Seed error (non-critical):", err.message);
    // });

    const port = parseInt(process.env.PORT || "3000", 10);
    httpServer.listen(port, "0.0.0.0", () => {
      log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
})();
