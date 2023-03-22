import { Error } from "mongoose";
import UsersModel from "../model/users.model";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
interface IUsers {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
exports.signUp = async (user: IUsers) => {};
