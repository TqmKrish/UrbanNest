const { Token } = require("../models/mongo/token/token-model");
const { getUser } = require("../services/auth-service");

const isAuthenticated = async (req, res, next) => {
  let token;
  try {
    const authHeaderValue = req.headers["authorization"];
    //   req.user = null;
    if (!authHeaderValue || !authHeaderValue.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    token = authHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    if (user && user.role === "admin") {
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized User" });
  } catch (error) {
    console.log(error);
    await Token.findOneAndDelete({ token: token });
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

const restrictRouteTo = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log("Redirect to login");
      return res.redirect("/login");
    }

    if (!req.roles.includes(req.user.role)) {
      console.log("Unauthorized User");
      return res.end("Unauthorized User");
    }

    return next();
  };
};

module.exports = { isAuthenticated, restrictRouteTo };
