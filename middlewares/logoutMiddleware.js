const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { LoginAuthentificationError } = require("../helper/errors");

const logoutMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new LoginAuthentificationError("Not authorized"));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    const auditUser = await User.findById(user._id);
    if (!auditUser || token !== auditUser.token) {
      throw new LoginAuthentificationError("Not authorized");
    }
    await User.findByIdAndUpdate(
      user._id,
      { token: null },
      { runValidators: true }
    );
    res.status(200).json({ message: "Success logout" });
  } catch (err) {
    throw new LoginAuthentificationError("Not authorized");
  }
};

module.exports = { logoutMiddleware };
