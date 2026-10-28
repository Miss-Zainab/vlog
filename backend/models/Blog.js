const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Blog description is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
