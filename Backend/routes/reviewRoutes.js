import { Router } from "express";
import * as reviewController from "../controllers/reviewController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.post("/", reviewController.createReview);
router.get("/city/:cityId", reviewController.getReviewsByCity);

// Admin routes
router.get("/all", authenticateToken, requireAdmin, reviewController.getAllReviews);

export default router;
