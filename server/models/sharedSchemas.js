const mongoose = require("mongoose");

const QuoteSourceSchema = mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
    },
    // if source is of type "others"
    // it may not have page
    page: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const LikeSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
};

module.exports = { QuoteSourceSchema, LikeSchema };
