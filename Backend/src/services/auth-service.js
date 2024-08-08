const jwt = require("jsonwebtoken");
const secret = "11@SeCrEtKeY@11";

const setUser = (user) => {
  const payload = { _id: user._id, email: email };
  return jwt.sign(payload, secret);
};

const getUser = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { setUser, getUser };
