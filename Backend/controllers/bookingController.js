import { storage } from "../config/storage.js";
import {sendEmail} from "../utils/sendEmail.js";
export async function createBooking(req, res) {
  try {
    const { cityId, cityName, name, email, phone, guests, startDate, notes, userId } = req.body;

    if (!cityId || !cityName || !name || !email || !phone || !guests || !startDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = await storage.createBooking({
      cityId,
      cityName,
      name,
      email,
      phone,
      guests: Number(guests),
      startDate: new Date(startDate),
      notes: notes || "",
      userId: userId || null,
    });
    await sendEmail(
      name,
      email,
      cityName,
      startDate,
      guests,
      null, // Assuming numDays is not provided in this context
      null, // Assuming totalCost is not provided in this context
      phone
    );
    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
}

export async function getBookingsByEmail(req, res) {
  try {
    const { email } = req.params;
    console.log("📧 Fetching bookings for email:", email);
    const bookings = await storage.getBookingsByEmail(email);
    console.log("📦 Found bookings:", bookings.length);
    res.json(bookings);
  } catch (error) {
    console.error("❌ Get bookings by email error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
}

export async function getBookingById(req, res) {
  try {
    const booking = await storage.getBooking(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
}
