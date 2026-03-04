import mongoose, { Schema } from "mongoose";

// Function to generate unique booking reference
function generateBookingReference() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `BK-${timestamp}-${randomStr}`.toUpperCase();
}

const bookingSchema = new Schema({
  bookingReference: {
    type: String,
    unique: true,
    default: generateBookingReference
  },
  userId: { type: String },
  cityId: { type: String, required: true },
  cityName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  startDate: { type: Date, required: true },
  notes: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

// Add virtual id field for compatibility
bookingSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtuals are included in JSON
bookingSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    return ret;
  }
});

export const Booking = mongoose.model("Booking", bookingSchema);
