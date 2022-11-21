const Joi = require("joi");

module.exports = {
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegment: 2,
        tlds: { allow: ["com", "net", "ua"] },
      }),
      // eslint-disable-next-line prefer-regex-literals
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error });
    }
    next();
  },
};
