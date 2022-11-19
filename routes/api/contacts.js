const express = require("express");
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controller/contactController");

const { tryCatchWrapper } = require("../../helper/apiHelper");

const {
  addContactValidation,
  putContactValidation,
  patchContactFavoriteValidation,
} = require("../../middlewares/validationMiddlevare");

const { validId } = require("../../middlewares/validationIdMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", tryCatchWrapper(listContactsController));

router.get("/:contactId", validId, tryCatchWrapper(getContactByIdController));

router.post("/", addContactValidation, tryCatchWrapper(addContactController));

router.delete("/:contactId", validId, tryCatchWrapper(removeContactController));

router.put(
  "/:contactId",
  validId,
  putContactValidation,
  tryCatchWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validId,
  patchContactFavoriteValidation,
  tryCatchWrapper(updateStatusContactController)
);

module.exports = router;
