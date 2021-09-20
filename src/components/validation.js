import Joi from "joi";

const validateCreateUser = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  genero: Joi.string().required(),
});

const validateAddToLine = Joi.object({
  id: Joi.number().required(),
});

const validateFindPosition = Joi.object({
  email: Joi.string().email().required(),
});

const validateFilterLine = Joi.object({
  genero: Joi.string().required(),
});

const validation = {
  validateCreateUser,
  validateAddToLine,
  validateFindPosition,
  validateFilterLine,
};
export default validation;
