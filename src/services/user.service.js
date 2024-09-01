const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByEmail = async(email) => {
  return await User.findOne({ email });
};  

const createUser = async (userBody) => {
  const { email } = userBody;
  if (await User.isEmailTaken(email)) {
    throw new ApiError(httpStatus.OK, "Email is already taken.");
  }

   const hashedPassword = await bcrypt.hash(userBody.password,10)
   const user = await User.create({...userBody, password: hashedPassword})

  return  user;
};
// TODO: CRIO_TASK_MODULE_CART - Implement getUserAddressById()
/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getUserAddressById = async (id) => {
  const user = await User.findOne({ _id: id }, { address: 1, email: 1 });
  // console.log(q);
  
  return { _id: id, address: user.address, email: user.email };
  
};

/**
 * Set user's shipping address
 * @param {String} email
 * @returns {String}
 */
const setAddress = async (userId, address) => {
  if (!address) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Address field is required!");
  }
  if (address.length < 20) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Address shouldn't be less than 20 characters"
    );
  }
  const user = await User.findById(userId);
  user.address = address;
  // user.save();
  // console.log(user, "in
  return user.address;

};

module.exports = { getUserById, getUserByEmail, createUser ,setAddress,getUserAddressById};
