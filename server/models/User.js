const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { userTypes } = require("../constants");
const { QuoteSourceSchema } = require("./sharedSchemas");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: userTypes.generic,
    },
    acceptedTNC: {
      type: Boolean,
      required: true, // users must accept
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    quoteSources: [QuoteSourceSchema],
    // chat rooms
  },
  {
    timestamps: true,
  }
);

// authentication to match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(String(enteredPassword), this.password);
};

// password encryption
UserSchema.pre("save", async function (req, res, next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while updating user password.");
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
