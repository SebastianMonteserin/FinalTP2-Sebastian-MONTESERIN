import Joi from "joi";

export const validar = (sonda) => {
  const sondaschema = Joi.object({
    id: Joi.number().integer().min(1).max(5).required(),
    temperatura: Joi.number().integer().min(-20).max(100).required(),
 
  });

  const { error } = sondaschema.validate(sonda);

  if (error) {
    return { result: false, error };
  }
  return { result: true };
}