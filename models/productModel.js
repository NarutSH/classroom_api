const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    brand: String,
    category: String,
    description: String,
    images: [String],
    price: Number,
    rating: Number,
    stock: Number,
    thumbnail: String,
    title: String,
  },
  {
    collection: "products",
  }
);

const product = mongoose.model("Products", schema);

module.exports = product;
