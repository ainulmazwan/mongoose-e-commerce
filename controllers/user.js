const bcrypt = require("bcrypt");

const User = require("../models/user");

const login = async (email, password) => {};

const signup = async (name, email, password) => {
  // 1 check if the email provided already exists
  const emailExists = await User.findOne({ email: email });
  // if email exists, throw error
  if (emailExists) {
    throw new Error("Email already exists");
  }

  // 2 create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash the password
  });
  // 3 save the user
  await newUser.save();
  // 4 return the user data
  return newUser;
};

module.exports = {
  login,
  signup,
};
