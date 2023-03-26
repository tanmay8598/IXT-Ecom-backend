const jwt = require("jsonwebtoken");

const generateToken = (id, name, email, shippingAddress, isDealer) => {
  return jwt.sign(
    { id, name, email, shippingAddress, isDealer },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
