const express = require("express");
const {
  singupUserCntr,
  SinginUserCntr,
  patchSubscriptionUserController,
  getCurrentUserConrtoller,
} = require("../../controller/userController");

const { tryCatchWrapper } = require("../../helper/apiHelper");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { logoutMiddleware } = require("../../middlewares/logoutMiddleware");
const {
  loginValidation,
} = require("../../middlewares/validationLoginMiddleware");

const router = express.Router();

router.post("/singup", loginValidation, tryCatchWrapper(singupUserCntr));

router.post("/singin", loginValidation, tryCatchWrapper(SinginUserCntr));

router.get("/logout", tryCatchWrapper(logoutMiddleware));

router.get(
  "/current",
  authMiddleware,
  tryCatchWrapper(getCurrentUserConrtoller)
);

router.patch(
  "/",
  authMiddleware,
  tryCatchWrapper(patchSubscriptionUserController)
);

module.exports = router;
