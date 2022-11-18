const express = require("express");
const {
  singupUserCntr,
  SinginUserCntr,
} = require("../../controller/userController");

const { tryCatchWrapper } = require("../../helper/apiHelper");

const router = express.Router();

router.post("/singup", tryCatchWrapper(singupUserCntr));

router.post("/singin", tryCatchWrapper(SinginUserCntr));

module.exports = router;
