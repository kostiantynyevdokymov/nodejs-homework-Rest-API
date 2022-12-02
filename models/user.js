const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { User } = require("../db/userModel");

const {
  RegistrationConflictError,
  LoginAuthentificationError,
  VerificationError,
} = require("../helper/errors");

const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const nodemailer = require("nodemailer");

const config = {
  host: "smpt.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "kostiantynyevdokymov@meta.ua",
    password: process.env.MAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
};
const transporter = nodemailer.createTransport(config);

const singUpFn = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationConflictError("Email is use");
  }

  const verificationToken = uuidv4();

  const user = new User({ email, password, verificationToken });
  await user.save();

  const emailOption = {
    from: "kostiantynyevdokymov@meta.ua",
    to: email,
    subject: "Please verify your email address with this token",
    text: `Please verify your email address: http://localhost:3001/users/verify/${verificationToken}`,
  };
  await transporter.sendMail(emailOption).catch((err) => console.log(err));

  return user;
};

const SingInFn = async (email, password) => {
  const user = await User.find({ email, varify: true });
  if (!user) {
    throw new LoginAuthentificationError("Email or password is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new LoginAuthentificationError(`Email or password is wrong`);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token }, { runValidators: true });

  return token;
};

const patchSubscriptionUser = async (id, subscription) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { runValidators: true, new: true }
  ).select({ email: 1, subscription: 1, _id: 0 });

  return updatedUser;
};

const getCurrentUser = async (id) => {
  const data = await User.findById(id).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });
  return data;
};

const uploadUserAvatar = async (userId, filename) => {
  Jimp.read(path.resolve(`./tmp/${filename}`), (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250)
      .quality(60)
      .greyscale()
      .write(path.resolve(`../public/avatars/${filename}`));
  });

  // remove avatar-file form foulder tmp

  fs.unlink(path.resolve(`./tmp/${filename}`), (err) => {
    if (err) {
      console.error(err);
      // eslint-disable-next-line no-useless-return
      return;
    }
  });

  const avatarURL = `avatars/${filename}`;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { avatarURL },
    { runValidators: true, new: true }
  ).select({ avatarURL: 1, _id: 0 });
  return updatedUser;
};

const verificationUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new VerificationError("Not found");
  }

  user.verificationToken = "null";
  user.verify = true;
  console.log(user);
  await user.save();

  const emailOption = {
    from: "kostiantynyevdokymov@meta.ua",
    to: user.email,
    subject: "Thank you for verifycation",
    text: `Well done. You profile verified.`,
  };
  await transporter.sendMail(emailOption).catch((err) => console.log(err));
};

module.exports = {
  singUpFn,
  SingInFn,
  patchSubscriptionUser,
  getCurrentUser,
  uploadUserAvatar,
  verificationUser,
};
