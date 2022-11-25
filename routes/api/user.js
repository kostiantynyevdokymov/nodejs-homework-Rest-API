const express = require("express");
const {
  singupUserCntr,
  SinginUserCntr,
  patchSubscriptionUserController,
  logoutUserController,
  patchUserAvatarController,
} = require("../../controller/userController");

const { tryCatchWrapper } = require("../../helper/apiHelper");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { logoutMiddleware } = require("../../middlewares/logoutMiddleware");
const {
  uploadAvatartMiddleware,
} = require("../../middlewares/uploadAvatarMiddleware");
const {
  loginValidation,
} = require("../../middlewares/validationLoginMiddleware");

const router = express.Router();

router.post("/singup", loginValidation, tryCatchWrapper(singupUserCntr));

router.post("/singin", loginValidation, tryCatchWrapper(SinginUserCntr));

router.get("/logout", authMiddleware, tryCatchWrapper(logoutMiddleware));

router.get("/current", authMiddleware, tryCatchWrapper(logoutUserController));

router.patch(
  "/",
  authMiddleware,
  tryCatchWrapper(patchSubscriptionUserController)
);
router.get("/avatars/:avatarId", express.static("../../public/avatars"));

router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatartMiddleware.single("avatar"),
  patchUserAvatarController
);

module.exports = router;
