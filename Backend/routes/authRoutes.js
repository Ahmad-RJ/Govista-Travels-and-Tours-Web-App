import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected routes
router.get("/user", authenticateToken, authController.getUser);

export default router;
