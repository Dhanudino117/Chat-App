// // lib/validation.js
// import Joi from "joi";

// const userSchema = Joi.object({
//   fullname: Joi.string().required().trim(),
//   email: Joi.string().email().required().trim(),
//   password: Joi.string().min(6).required().trim(),
// });

// export const validateUser Input = (data) => {
//   return userSchema.validate(data);
// };
