const Joi = require("joi");
const { password } = require("./custom.validation");

// TODO: CRIO_TASK_MODULE_AUTH - Define request validation schema for user registration
/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 *
// const register = {
//   email : Joi.string().email({ tlds: { allow: false } }),
//   password : Joi.string(),password ,
//   name : Joi.string()
// };
*/
const register = {
  body: Joi.object().keys({
    email:Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required()
  })
};

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */
// const login = {
//   email: Joi.string().email({ tlds: { allow: false } }),
//   password : Joi.string(),password 
// };
const login = {
  body:Joi.object().keys({
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })
};

module.exports = {
  register,
  login,
};
