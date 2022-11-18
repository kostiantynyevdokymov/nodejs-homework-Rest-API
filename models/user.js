const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../db/userModel");
const { NotAuthError } = require("../helper/apiHelper");

const singUpFn = async (email, password) => {
  const user = new User({ email, password });
  await user.save();
};

const SingInFn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthError(`No user with email ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthError(`Wrong password or email`);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return token;
};

module.exports = { singUpFn, SingInFn };
