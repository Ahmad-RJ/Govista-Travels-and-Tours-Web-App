// Shared API types

export interface Review {
  _id: string;
  cityId: string | {
    _id: string;
    name: string;
    country: string;
    image: string;
  };
  userId?: string | {
    _id: string;
    name: string;
    email: string;
  };
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface City {
  _id: string;
  name: string;
  country: string;
  description: string;
  priceStart: number;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  id: string; // For compatibility with existing code
  bookingReference: string;
  userId?: string;
  cityId: string;
  cityName: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  startDate: string;
  notes?: string;
  status: string;
  createdAt: string;
}
