const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8940h",//1 year
    }
  );
};

const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};

module.exports = { tokenSign, decodeSign, verifyToken };