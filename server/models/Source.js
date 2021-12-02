const mongoose = require("mongoose");
const { sourceTypes } = require("../constants");
const { LikeSchema } = require("./sharedSchemas");

const SourceCommentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    // replies
  },
  {
    timestamps: true,
  }
);

const SourceSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      default: sourceTypes,
    },
    // use API to get book cover, otherwise fallback to default source image
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comments: [SourceCommentSchema],
    likes: [LikeSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Source = mongoose.model("Source", SourceSchema);
module.exports = Source;
