const Users = require("../models/userModel");

//READ

exports.index = async (req, res) => {
  const users = await Users.find();

  res.status(200).json({
    data: users,
  });
};

//READ
exports.show = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      data: user,
      message: "Successfully get user",
    });
  } catch (err) {
    res.status(400).json({
      error: `Error getting user ${err.message}`,
    });
  }
};

//CREATE
exports.insert = async (req, res) => {
  const { first_name, last_name, city, country } = req.body;

  const user = new Users({
    first_name,
    last_name,
    address: {
      city,
      country,
    },
  });

  await user.save();

  res.status(201).json({
    data: user,
    message: "Successfully added user",
  });
};

//UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, city, country } = req.body;

    if (!id) {
      throw new Error("Please provide an id");
    }

    if (!first_name || !last_name) {
      throw new Error("Please provide first_name and last_name");
    }

    const user = await Users.findByIdAndUpdate(id, {
      first_name,
      last_name,
      address: {
        city,
        country,
      },
    });

    res.status(200).json({
      message: "Successfully updated user",
    });
  } catch (err) {
    res.status(400).json({
      error: `Error updating user ${err.message}`,
    });
  }
};

// DELETE
exports.delete = async (req, res) => {
  const { id } = req.params;

  await Users.findByIdAndDelete(id);

  res.status(200).json({
    data: {
      message: "deleted successfully",
    },
  });
};
