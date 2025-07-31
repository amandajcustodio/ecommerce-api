import { Joi } from "celebrate";

export const idSchema = Joi.object({
  id: Joi.string().alphanum().required()
});