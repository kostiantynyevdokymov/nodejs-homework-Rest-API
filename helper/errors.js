class RegistrationConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class LoginAuthentificationError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class VerificationError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  RegistrationConflictError,
  LoginAuthentificationError,
  VerificationError,
  BadRequestError,
};
