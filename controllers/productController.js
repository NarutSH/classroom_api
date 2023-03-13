const Products = require("../models/productModel");

exports.index = async (req, res) => {
  const products = await Products.find();

  res.status(200).json({
    data: products,
  });
};

exports.insert = async (req, res) => {
  try {
    const {
      brand,
      category,
      description,
      images,
      price,
      rating,
      stock,
      thumbnail,
      title,
    } = req.body;

    if (!title || !price || !thumbnail || !brand) {
      throw new Error("Please provide  title, price, thumbnail and brand");
    }

    const product = new Products({
      brand,
      category,
      description,
      images,
      price,
      rating,
      stock,
      thumbnail,
      title,
    });

    await product.save();

    res.status(201).json({
      data: product,
      message: "Successfully added product",
    });
  } catch (err) {
    res.status(400).json({
      error: `Error updating user ${err.message}`,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      brand,
      category,
      description,
      images,
      price,
      rating,
      stock,
      thumbnail,
      title,
    } = req.body;

    if (!id) {
      throw new Error("Please provide an id");
    }

    if (!title || !price || !thumbnail || !brand) {
      throw new Error("Please provide  title, price, thumbnail and brand");
    }

    const product = await Products.findByIdAndUpdate(id, {
      brand,
      category,
      description,
      images,
      price,
      rating,
      stock,
      thumbnail,
      title,
    });

    res.status(200).json({
      message: "Successfully updated product",
    });
  } catch (err) {
    res.status(400).json({
      error: `Error updating user ${err.message}`,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await Products.findByIdAndDelete(id);

  res.status(200).json({
    data: {
      message: "deleted successfully",
    },
  });
};
