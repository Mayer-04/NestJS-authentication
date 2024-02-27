import * as Joi from 'joi';

export const validationEnv = Joi.object({
  PORT: Joi.number().port().required(),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
