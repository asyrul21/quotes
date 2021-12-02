const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const requireLogin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id).select("-password");
      req.user = currentUser;
      return next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed. " + error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized.");
  }
});

const mustBeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
};

module.exports = { requireLogin, mustBeAdmin };
