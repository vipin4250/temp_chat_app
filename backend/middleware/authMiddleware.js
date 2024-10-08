require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; 

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //   console.log(decoded);
      req.user = await User.findById(decoded._id).select("-password");
    //   console.log(req.user);  // Check if req.user is populated before calling next()

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };