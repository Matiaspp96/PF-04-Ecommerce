const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
  console.log(`Esto es user en line 4 de user token ${user}`);
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "48h", //1 year
    }
  );
};

const tokenEmail = async () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  const rv = random + fecha;
  return jwt.sign(
    {
      rv,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "0.25h", //1 year
    }
  );
};

const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  } catch (e) {
    return null;
  }
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};

module.exports = { tokenSign, decodeSign, verifyToken, tokenEmail };
