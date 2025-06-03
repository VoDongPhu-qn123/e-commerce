const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://st2.depositphotos.com/1006899/8421/i/450/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Export the model
module.exports = mongoose.model("Blog", BlogSchema);
