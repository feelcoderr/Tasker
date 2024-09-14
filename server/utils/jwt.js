// utils/jwt.js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, "secret");
};

module.exports = { generateToken, verifyToken };
