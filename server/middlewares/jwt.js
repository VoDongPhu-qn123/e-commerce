const jwt = require("jsonwebtoken");

// Tạo  accessToken
const generateAccessToken = (userId, role) =>
  jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, { expiresIn: "2d" });
// Tạo refreshToken
const generateRefreshToken = (userId) =>
  jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
