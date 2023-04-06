const jwt = require("jsonwebtoken");

const generateToken = (id, phone, shippingAddress, isDealer, name) => {
  return jwt.sign(
    { id, phone, shippingAddress, isDealer, name },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
