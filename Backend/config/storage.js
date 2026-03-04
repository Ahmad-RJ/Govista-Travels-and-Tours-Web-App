import session from "express-session";
import MongoStore from "connect-mongo";
import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";
import { Review } from "../models/Review.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/govista";

export class MongoStorage {
  constructor() {
    this.sessionStore = MongoStore.create({
      mongoUrl: MONGODB_URI,
      collectionName: "sessions",
    });
  }

  async getUser(id) {
    return User.findById(id).exec();
  }

  async getUserByUsername(username) {
    return User.findOne({ username }).exec();
  }

  async getUserByEmail(email) {
    return User.findOne({ email }).exec();
  }

  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  }

  async createBooking(bookingData) {
    const booking = new Booking(bookingData);
    return booking.save();
  }

  async getBooking(id) {
    return Booking.findById(id).exec();
  }

  async getBookingsByUser(userId) {
    if (!userId) return [];
    return Booking.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async getBookingsByEmail(email) {
    console.log("🔍 Storage: Searching bookings with email:", email);
    const bookings = await Booking.find({ email }).sort({ createdAt: -1 }).exec();
    console.log("✅ Storage: Found", bookings.length, "booking(s)");
    return bookings;
  }

  async updateBookingStatus(id, status) {
    return Booking.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async createReview(reviewData) {
    const review = new Review(reviewData);
    return review.save();
  }

  async getReviewsByCity(cityId) {
    return Review.find({ cityId }).sort({ createdAt: -1 }).exec();
  }

  async getReviewsByUser(userId) {
    return Review.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}

export const storage = new MongoStorage();
