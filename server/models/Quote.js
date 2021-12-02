const mongoose = require("mongoose");
const { QuoteSourceSchema } = require("./sharedSchemas");

const QuoteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quote: {
      type: String,
      required: true,
    },
    quoteSource: QuoteSourceSchema,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    likes: [ReviewSchema],
    numLikes: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;
