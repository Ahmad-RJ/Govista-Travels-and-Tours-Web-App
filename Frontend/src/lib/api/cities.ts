const API_BASE = "/api/cities";

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

export interface CreateCityData {
  name: string;
  country: string;
  description: string;
  priceStart: number;
  image: string;
  rating?: number;
  reviews?: number;
  features?: string[];
}

export interface UpdateCityData extends Partial<CreateCityData> {}

export interface SearchCitiesParams {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Get all cities
export async function getAllCities(): Promise<City[]> {
  const response = await fetch(API_BASE, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch cities");
  return response.json();
}

// Get city by ID
export async function getCityById(id: string): Promise<City> {
  const response = await fetch(`${API_BASE}/${id}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch city");
  return response.json();
}

// Search cities
export async function searchCities(params: SearchCitiesParams): Promise<City[]> {
  const queryParams = new URLSearchParams();
  if (params.query) queryParams.append("query", params.query);
  if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
  if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());

  const response = await fetch(`${API_BASE}/search?${queryParams.toString()}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to search cities");
  return response.json();
}

// Create new city
export async function createCity(data: CreateCityData): Promise<City> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create city");
  return response.json();
}

// Update city
export async function updateCity(id: string, data: UpdateCityData): Promise<City> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update city");
  return response.json();
}

// Delete city (soft delete)
export async function deleteCity(id: string): Promise<{ message: string; city: City }> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete city");
  return response.json();
}

// Permanently delete city
export async function permanentDeleteCity(id: string): Promise<{ message: string; city: City }> {
  const response = await fetch(`${API_BASE}/${id}/permanent`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to permanently delete city");
  return response.json();
}
