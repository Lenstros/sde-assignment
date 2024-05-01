/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // userId: { type: String, required: true, unique: true },
    userFirstName: { type: String, required: true, trim: true },
    userLastName: { type: String, required: false, trim: true },
    userEmail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    userPhone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
      validate: {
        validator(v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    userAddress: { type: String, required: true },
    userCity: { type: String, required: true },
    userState: { type: String, required: true },
    userZip: { type: String, required: false },
    userCountry: { type: String, required: true },
    userGender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    userDob: { type: Date, required: true },
    userStatus: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "dormant"],
    },
    totalMarks: { type: Number, default: 0 },
    course: { type: String, required: true },
    userCreatedAt: { type: Date, default: Date.now },
    userUpdatedAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
