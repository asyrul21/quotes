const mongoose = require("mongoose");

const QuoteSourceSchema = mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
    },
    page: { type: Number, required: true },
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
