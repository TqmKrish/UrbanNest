const jwt = require("jsonwebtoken");

const setUser = (user) => {
  const payload = { _id: user._id, email: email };
  return jwt.sign(payload, secret);
};

const getUser = (token) => {
  try {
    console.log(token);
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { setUser, getUser };
