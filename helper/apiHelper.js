const {
  RegistrationConflictError,
  LoginAuthentificationError,
} = require("./errors");

const tryCatchWrapper = (controller) => {
  return async (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const createErrorHandler = (err, req, res, next) => {
  if (
    err instanceof RegistrationConflictError ||
    err instanceof LoginAuthentificationError
  ) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
};

const registrationConflictError = (err, req, res, next) => {
  res.status(409).json({ message: err.message });
};

module.exports = {
  tryCatchWrapper,
  createErrorHandler,
  registrationConflictError,
};
