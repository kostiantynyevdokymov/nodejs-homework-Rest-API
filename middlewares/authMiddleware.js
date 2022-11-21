const jwt = require("jsonwebtoken");

const { LoginAuthentificationError } = require("../helper/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      next(new LoginAuthentificationError("Not authorized"));
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const auditUser = await User.findById(user._id);
    if (!auditUser || token !== auditUser.token) {
      throw new LoginAuthentificationError("Not authorized");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new LoginAuthentificationError("Not authorized"));
  }
};

module.exports = { authMiddleware };
