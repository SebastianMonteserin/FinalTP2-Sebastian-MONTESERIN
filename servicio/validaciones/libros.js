import Joi from "joi";

export const validar = (libro) => {
  const libroSchema = Joi.object({
    codigo: Joi.number().integer().required(),
    titulo: Joi.string().min(3).max(60).required(),
    autor: Joi.string().min(3).max(60).required(),
  });

  const { error } = libroSchema.validate(libro);

  if (error) {
    return { result: false, error };
  }
  return { result: true };
}