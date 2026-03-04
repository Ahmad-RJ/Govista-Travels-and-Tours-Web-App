import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";

const router = Router();

router.post("/", bookingController.createBooking);
router.get("/email/:email", bookingController.getBookingsByEmail);
router.get("/:id", bookingController.getBookingById);

export default router;
