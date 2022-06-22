const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
require("dotenv").config();

const gravatar = require("../util/gravatar");

module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: "My Super Hero",
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models }) => {
    try {
      return await models.Note.findOneAndUpdate(
        { _id: id },
        { content: content },
        { new: true }
      );
    } catch (err) {
      return console.log("Note does not exist");
    }
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // Trim and convert email to lowercase
    email = email.trim().toLowerCase();

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    //create gravatar url
    const avatar = gravatar(email);

    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });

      // Create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error("Error occured while signing up");
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // If user entered email trim and convert to lowercase
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({ $or: [{ email }, { username }] });

    // If no user is found throw error
    if (!user) {
      throw new AuthenticationError("Error signing in!");
    }

    // Create and return the jwt token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
