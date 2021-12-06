const mongoose = require("mongoose");

// catgories are shared across application
const CategorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
