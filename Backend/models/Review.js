import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false  // Optional because guests can also leave reviews
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "City",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: { type: String, required: true },
  userName: { type: String, required: true },  // Keep for guest reviews
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp before saving
reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
});

export const Review = mongoose.model("Review", reviewSchema);
