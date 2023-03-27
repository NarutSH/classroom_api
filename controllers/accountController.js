const Accounts = require("../models/accountModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      res.status(400).json({
        error: {
          message: "All fields must be provided",
        },
      });
    }

    // check if existing account

    const existingUser = await Accounts.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        message: "Account already exists",
      });
    }

    //encryptPassword

    const encryptPassword = bcrypt.hashSync(password, 10);

    const account = new Accounts({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    await account.save();

    const data = {
      user_id: account._id,
      email,
    };

    const secretKey = "aaaaa";

    const options = {
      expiresIn: "2h",
    };

    const token = jwt.sign(data, secretKey, options);

    res.status(201).json({
      message: "successfully registeration",
      data: {
        account,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err,
      message: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided

    if (!email || !password) {
      res.status(400).json({
        error: {
          message: "Email and password must be provided",
        },
      });
    }

    // check user is in database

    const account = await Accounts.findOne({ email });

    if (!account) {
      res.status(404).json({
        message: "No user account in database",
      });
    }

    //check password

    const checkPassword = bcrypt.compareSync(password, account.password); // true / false

    if (account && checkPassword) {
      const token = jwt.sign(
        {
          user_id: account._id,
          email,
        },
        "aaaaa",
        {
          expiresIn: "2h",
        }
      );

      res.status(200).json({
        message: "Successfully login",
        data: {
          account,
          token,
        },
      });
    } else {
      res.status(404).json({
        message: "Email and password do not match",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err,
      message: "Something went wrong",
    });
  }
};
