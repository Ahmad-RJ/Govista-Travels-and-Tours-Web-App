import { User } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

// Register new user
export async function register(req, res) {
  try {
    const { username, email, password, name, phone } = req.body;

    // Validation
    if (!username || !email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      name,
      phone: phone || "",
      role: "user"
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      username: user.username,
      role: user.role
    });

    // Return user and token
    res.status(201).json({
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error("Register error:", error);
    console.error("Error stack:", error.stack);

    // Check for validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    res.status(500).json({ error: "Registration failed: " + error.message });
  }
}

// Login user
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      username: user.username,
      role: user.role
    });

    // Return user and token
    const userJSON = user.toJSON();
    console.log("Login successful, returning user:", userJSON);
    res.status(200).json({
      user: userJSON,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
}

// Logout (client-side will remove token)
export function logout(req, res) {
  // With JWT, logout is handled client-side by removing the token
  res.status(200).json({ message: "Logged out successfully" });
}

// Get current user (requires authentication middleware)
export function getUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.status(200).json({ user: req.user.toJSON() });
}
