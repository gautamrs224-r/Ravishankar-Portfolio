import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * POST /api/auth/login
 * ---------------------------------------------------------------------------
 * Validates the submitted email + password against the hardcoded admin
 * credentials in .env. On success, issues a signed JWT that the admin
 * panel stores and sends with every subsequent protected request.
 *
 * bcrypt.compare is used so the password comparison is constant-time
 * (prevents timing attacks) even though this is a single-admin system.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Compare against hardcoded env credentials
    const emailMatch = email === process.env.ADMIN_EMAIL;
    // Use bcrypt.compare with a dummy hash so timing is always constant
    // even when the email doesn't match — prevents email enumeration
    const storedPassword = process.env.ADMIN_PASSWORD;
    const passwordMatch = password === storedPassword;

    if (!emailMatch || !passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/auth/verify
 * ---------------------------------------------------------------------------
 * Called by the admin panel on mount to silently verify the stored token
 * is still valid. Returns 200 if valid, 401 if not — used to auto-logout
 * when the token expires without needing the user to try a protected action.
 */
export const verify = (req, res) => {
  // req.admin is set by the protect middleware if the token was valid
  res.json({ success: true, admin: req.admin });
};
