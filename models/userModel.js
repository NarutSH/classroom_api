const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    first_name: String,
    last_name: String,
    address: {
      city: String,
      country: String,
    },
  },
  {
    collection: "users",
  }
);

const user = mongoose.model("Users", schema);

module.exports = user;
