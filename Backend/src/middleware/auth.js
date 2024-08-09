const { getUser } = require("../services/auth-service");

const isAuthenticated = (req, res, next) => {
  const authHeaderValue = req.headers["authorization"];
  //   req.user = null;
  if (!authHeaderValue || !authHeaderValue.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  const token = authHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  if (user && user.role === "admin") {
    req.user = user;
    return next();
  }

  return res.status(401).json({ message: "Unauthorized User" });
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
