import { Request, Response } from "express";
import UsersModel from "../../model/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();
exports.logIn = async (req: Request, res: Response) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await UsersModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email, userType: user.userType },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({
        first_name: user.first_name,
        last_name: user.last_name,
        token: token,
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

exports.signUp = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }
    // check if user already exist
    const oldUser = await UsersModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await UsersModel.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    user.save();
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email, userType: user.userType },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    // return new user
    res.status(201).json({
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};
