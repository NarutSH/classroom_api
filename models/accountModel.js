const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  {
    collection: "accounts",
  }
);

const account = mongoose.model("Accounts", schema);

module.exports = account;
