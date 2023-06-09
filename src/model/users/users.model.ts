import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IUsers {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  studentEmailList: string[];
}
const userSchema: Schema = new Schema<IUsers>({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: "student" },
  studentEmailList: { type: [String], required: false },
});

const UsersModel: Model<IUsers> = mongoose.model<IUsers>("users", userSchema);

export default UsersModel;
