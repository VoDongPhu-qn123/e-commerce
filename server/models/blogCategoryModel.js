const mongoose = require("mongoose"); // Erase if already required
var blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("BlogCategory", blogCategorySchema);
