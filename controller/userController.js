const { User } = require("../db/userModel");
const {
  singUpFn,
  SingInFn,
  patchSubscriptionUser,
  getCurrentUser,
  uploadUserAvatar,
  verificationUser,
  repeatedVerificationUser,
} = require("../models/user");

const singupUserCntr = async (req, res) => {
  const { email, password } = req.body;
  const user = await singUpFn(email, password);
  res.status(201).json({
    status: "success",
    email: user.email,
    subscription: user.subscription,
  });
};

const SinginUserCntr = async (req, res) => {
  const { email, password } = req.body;
  const token = await SingInFn(email, password);
  res.status(200).json({ status: "success", token });
};

const patchSubscriptionUserController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await patchSubscriptionUser(_id, subscription);
  res.status(200).json({ message: "success", user: updatedUser });
};

const getCurrentUserConrtoller = async (req, res) => {
  const { _id } = req.user;
  const user = await getCurrentUser(_id);
  res.status(200).json({ status: "success", user });
};

const logoutUserController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null }, { runValidators: true });
  res.status(200).json({ status: "success logout" });
};

const patchUserAvatarController = async (req, res) => {
  const { filename } = req.file;
  const { _id } = req.file;
  const updatedUser = await uploadUserAvatar(_id, filename);
  res.status(200).json({ status: "success", user: updatedUser });
};

const verifictationUserController = async (req, res) => {
  const { verficationToken } = req.params;
  await verificationUser(verficationToken);
  res.status(200).json({ message: "Verification succeful" });
};
const repeatedVerificationUserController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }
  await repeatedVerificationUser(email);
  res.status(200).json({ message: "Verification email send" });
};

module.exports = {
  singupUserCntr,
  SinginUserCntr,
  patchSubscriptionUserController,
  getCurrentUserConrtoller,
  logoutUserController,
  patchUserAvatarController,
  verifictationUserController,
  repeatedVerificationUserController,
};
