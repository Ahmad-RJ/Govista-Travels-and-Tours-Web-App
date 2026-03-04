import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

// Middleware to verify JWT token
export async function authenticateToken(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(403).json({ error: "User not found or inactive" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
}

// Middleware to check if user is admin
export function requireAdmin(req, res, next) {
  console.log("🔒 Checking admin access...");
  console.log("User:", req.user ? req.user.username : "No user");
  console.log("Role:", req.user ? req.user.role : "No role");
  console.log("next type:", typeof next);

  if (!req.user) {
    console.log("❌ No user in request");
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.user.role !== "admin") {
    console.log("❌ User is not admin");
    return res.status(403).json({ error: "Admin access required" });
  }

  console.log("✅ Admin access granted");

  if (typeof next !== 'function') {
    console.error("❌ next is not a function in requireAdmin");
    return res.status(500).json({ error: "Middleware configuration error", details: "next is not a function" });
  }

  next();
}

// Optional authentication - doesn't fail if no token
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const user = await User.findById(decoded.userId);
        if (user && user.isActive) {
          req.user = user;
        }
      }
    }
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
}
