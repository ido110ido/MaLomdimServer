import { Request, Response } from "express";
import UsersModel from "../../model/users/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  addingStudentEmail,
  getStudentEmailList,
  removeStudentEmail,
} from "../../services/users/user.services";
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
        {
          user_id: user._id,
          email,
          role: user.role,
          name: user.first_name + " " + user.last_name,
        },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
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
    const teacher = await UsersModel.findOne({ role: "teacher" });
    if (!teacher?.studentEmailList.includes(email)) {
      return res.status(409).send("not invited email");
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
    if (!teacher) user.role = "teacher";
    user.save();
    // Create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
        role: user.role,
        name: user.first_name + " " + user.last_name,
      },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    // return new user
    res.status(201).json({
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getStudent = async (req: Request, res: Response) => {
  try {
    const teacherId: string = res.locals.UserId;
    const studentEmails = await getStudentEmailList(teacherId);
    return res.status(200).json({
      status: 200,
      data: studentEmails,
      message: "Successfully get student Emails list",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.addingStudent = async (req: Request, res: Response) => {
  try {
    const teacherId = res.locals.UserId; // get the user ID from res.locals
    const emails = req.body.map((item: { email: any }) => item.email); // get the user ID from res.locals
    console.log(teacherId);
    console.log(req.body);

    const studentEmails = await addingStudentEmail(emails, teacherId);
    return res.status(200).json({
      status: 200,
      data: studentEmails,
      message: "Successfully add student Emails",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.removingStudent = async (req: Request, res: Response) => {
  try {
    const teacherId: string = res.locals.UserId;
    const studentEmails = await removeStudentEmail(req.body.student, teacherId);
    return res.status(200).json({
      status: 200,
      data: studentEmails,
      message: "Successfully remove student Emails",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
