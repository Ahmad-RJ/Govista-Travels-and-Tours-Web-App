import { Router } from "express";
import * as cityController from "../controllers/cityController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Public GET routes
router.get("/", cityController.getAllCities);
router.get("/search", cityController.searchCities);
router.get("/:id", cityController.getCityById);

// Protected routes (admin only)
router.post("/", authenticateToken, requireAdmin, cityController.createCity);
router.put("/:id", authenticateToken, requireAdmin, cityController.updateCity);
router.delete("/:id", authenticateToken, requireAdmin, cityController.deleteCity);
router.delete("/:id/permanent", authenticateToken, requireAdmin, cityController.permanentDeleteCity);

export default router;
