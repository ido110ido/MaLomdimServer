import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IChef {
  img: string;
  firstName: string;
  lastName: string;
  visited: number;
  startDate: string;
  about: string;
}
const userSchema: Schema = new Schema<IChef>({
  img: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  visited: { type: Number, default: 0 },
  startDate: { type: String, required: true },
  about: { type: String, required: true },
});

const ChefsModel: Model<IChef> = mongoose.model<IChef>("chefs", userSchema);

export default ChefsModel;
