const { isValidObjectId } = require("mongoose");

const validId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = new Error(`${contactId} is not correct`);
    error.status = 400;
    next(error);
  }
  next();
};
module.exports = { validId };
