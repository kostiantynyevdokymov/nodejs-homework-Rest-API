const express = require("express");
const {
  singupUserCntr,
  SinginUserCntr,
  patchSubscriptionUserController,
  logoutUserController,
  patchUserAvatarController,
  getCurrentUserConrtoller,
  verifictationUserController,
  repeatedVerificationUserController,
} = require("../../controller/userController");

const { tryCatchWrapper } = require("../../helper/apiHelper");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  uploadAvatartMiddleware,
} = require("../../middlewares/uploadAvatarMiddleware");
const {
  loginValidation,
} = require("../../middlewares/validationLoginMiddleware");
const {
  repeatedVerificationUserValidation,
} = require("../../middlewares/validationMiddlevare");

const router = express.Router();

router.post("/signup", loginValidation, tryCatchWrapper(singupUserCntr));

router.post("/signin", loginValidation, tryCatchWrapper(SinginUserCntr));

router.get("/logout", authMiddleware, tryCatchWrapper(logoutUserController));

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
router.get("/avatars/:avatarId", express.static("../../public/avatars"));

router.post(
  "/verify/",
  repeatedVerificationUserValidation,
  tryCatchWrapper(repeatedVerificationUserController)
);
router.get("/verify/:verificationToken", verifictationUserController);
router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatartMiddleware.single("avatar"),
  patchUserAvatarController
);

module.exports = router;
