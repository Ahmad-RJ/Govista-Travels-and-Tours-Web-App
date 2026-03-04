import authRoutes from "./authRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import cityRoutes from "./cityRoutes.js";
import chatbotRoutes from "./chatbotRoutes.js";

export function registerRoutes(app) {
  app.use("/api", authRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/cities", cityRoutes);
  app.use("/api/chatbot", chatbotRoutes);
}
