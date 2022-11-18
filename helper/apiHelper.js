const tryCatchWrapper = (controller) => {
  return async (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const createErrorHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

const NotAuthError = (err, req, res, next) => {
  res.status(401).json({ message: err.message });
};

module.exports = {
  tryCatchWrapper,
  createErrorHandler,
  NotAuthError,
};
