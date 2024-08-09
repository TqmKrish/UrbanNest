const jwt = require("jsonwebtoken");
const { Token } = require("../models/mongo/token/token-model");

// Function to generate JWT
const generateJWT = async (email, role) => {
  const payload = { email, role };
  const secret = process.env.JWT_SECRET; // Ensure this is correctly set in your environment
  const token = jwt.sign(payload, secret, { expiresIn: "1h" }); // 1-hour expiration
  return token;
};

// Function to save the token in the database (if required)
const saveTokenInDB = async (userId, email, token) => {
  try {
    const existingToken = await Token.findOne({ userId });

    if (existingToken) {
      // Update existing token
      existingToken.token = token;
      existingToken.tokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
      await existingToken.save();
    } else {
      // Create a new token entry
      const tokenEntry = new Token({
        userId,
        email,
        token,
        tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        tokenType: "auth",
      });

      await tokenEntry.save();
    }

    return true;
  } catch (error) {
    console.error("Error saving token:", error);
    return false;
  }
};

module.exports = { generateJWT, saveTokenInDB };
