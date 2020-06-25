const Joi = require('@hapi/joi')

const registerValidation = (body) => {
  const validateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required(),
  })
  const { error } = validateSchema.validate(body);
  return error;
}
const loginValidation = (body) => {
  const validateSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required(),
  })
  const { error } = validateSchema.validate(body);
  return error;
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation