import { Joi } from "celebrate";

export const idSchema = Joi.object({
  id: Joi.string().alphanum().length(20).required()
});