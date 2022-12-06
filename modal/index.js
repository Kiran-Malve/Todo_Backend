const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is Required"],
      trim: true,
    },
    description: {
      type: String,
      require: [true, "Description is Required"],
      unique: true,
      maxlength: [50, "Description must be 25 Ch Long"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
