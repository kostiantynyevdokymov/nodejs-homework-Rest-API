const { singUpFn, SingInFn } = require("../models/user");

const singupUserCntr = async (req, res) => {
  const { email, password } = req.body;
  await singUpFn(email, password);
  res.status(201).json({ status: "success" });
};

const SinginUserCntr = async (req, res) => {
  const { email, password } = req.body;
  const token = await SingInFn(email, password);
  res.status(200).json({ status: "success", token });
};

module.exports = { singupUserCntr, SinginUserCntr };
