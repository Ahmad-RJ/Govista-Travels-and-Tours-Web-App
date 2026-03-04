import { City } from "../models/City.js";

// Get all cities
export async function getAllCities(req, res) {
  try {
    console.log("🔍 Fetching all cities...");
    // Find cities where isActive is true OR isActive field doesn't exist (default to true)
    const cities = await City.find({ $or: [{ isActive: true }, { isActive: { $exists: false } }] }).sort({ createdAt: -1 });
    console.log(`✓ Found ${cities.length} active cities`);
    console.log("Sample city:", cities[0] ? { name: cities[0].name, image: cities[0].image?.substring(0, 50) } : "No cities");
    res.status(200).json(cities);
  } catch (error) {
    console.error("Get all cities error:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
}

// Get single city by ID
export async function getCityById(req, res) {
  try {
    const { id } = req.params;
    const city = await City.findById(id);

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(city);
  } catch (error) {
    console.error("Get city by ID error:", error);
    res.status(500).json({ error: "Failed to fetch city" });
  }
}

// Create new city
export async function createCity(req, res) {
  try {
    console.log("📝 Creating new city...");
    console.log("Request body:", req.body);
    console.log("Auth user:", req.user);

    const { name, country, description, priceStart, image, rating, reviews, features } = req.body;

    // Validation
    if (!name || !country || !description || !priceStart || !image) {
      console.log("❌ Missing required fields:", { name: !!name, country: !!country, description: !!description, priceStart: !!priceStart, image: !!image });
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCity = new City({
      name,
      country,
      description,
      priceStart: Number(priceStart),
      image,
      rating: rating ? Number(rating) : 0,
      reviews: reviews ? Number(reviews) : 0,
      features: features || []
    });

    console.log("Saving city:", newCity);
    const savedCity = await newCity.save();
    console.log("✅ City created successfully:", savedCity._id);
    res.status(201).json(savedCity);
  } catch (error) {
    console.error("❌ Create city error:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Failed to create city", details: error.message });
  }
}

// Update city
export async function updateCity(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdAt;

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(updatedCity);
  } catch (error) {
    console.error("Update city error:", error);
    res.status(500).json({ error: "Failed to update city" });
  }
}

// Delete city (soft delete)
export async function deleteCity(req, res) {
  try {
    const { id } = req.params;

    const deletedCity = await City.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );

    if (!deletedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully", city: deletedCity });
  } catch (error) {
    console.error("Delete city error:", error);
    res.status(500).json({ error: "Failed to delete city" });
  }
}

// Permanently delete city
export async function permanentDeleteCity(req, res) {
  try {
    const { id } = req.params;

    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json({ message: "City permanently deleted", city: deletedCity });
  } catch (error) {
    console.error("Permanent delete city error:", error);
    res.status(500).json({ error: "Failed to permanently delete city" });
  }
}

// Search cities
export async function searchCities(req, res) {
  try {
    const { query, minPrice, maxPrice } = req.query;

    // Start with filter that includes cities without isActive field
    let searchFilter = { $or: [{ isActive: true }, { isActive: { $exists: false } }] };

    // Build conditions array for $and query
    const conditions = [searchFilter];

    // Text search
    if (query) {
      conditions.push({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { country: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      });
    }

    // Price range filter
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      conditions.push({ priceStart: priceFilter });
    }

    const finalFilter = conditions.length > 1 ? { $and: conditions } : searchFilter;
    const cities = await City.find(finalFilter).sort({ rating: -1, createdAt: -1 });
    res.status(200).json(cities);
  } catch (error) {
    console.error("Search cities error:", error);
    res.status(500).json({ error: "Failed to search cities" });
  }
}
