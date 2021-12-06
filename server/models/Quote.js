const mongoose = require("mongoose");
const { QuoteSourceSchema, LikeSchema } = require("./sharedSchemas");

// shared across platform
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
    // quoteSource is optional
    // if there is a quoteSource, author takes the value of
    // quoteSource.source.author
    // this should be the author of the book
    // otheriwise, author with take this "author "value here
    // nullable
    author: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    public: {
      type: Boolean,
      default: true,
    },
    likes: [LikeSchema],
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
