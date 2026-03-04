import { Review } from "../models/Review.js";
import { City } from "../models/City.js";

export async function createReview(req, res) {
  try {
    const { cityId, rating, comment, userName, userId } = req.body;

    if (!cityId || !rating || !comment || !userName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const review = new Review({
      cityId,
      rating: Number(rating),
      comment,
      userName,
      userId: userId || null,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
}

export async function getReviewsByCity(req, res) {
  try {
    const reviews = await Review.find({ cityId: req.params.cityId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Get reviews by city error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}

// Admin: Get all reviews across all destinations
export async function getAllReviews(req, res) {
  try {
    const reviews = await Review.find()
      .populate('cityId', 'name country image')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Get all reviews error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}
