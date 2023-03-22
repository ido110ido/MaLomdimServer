import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IDish {
  resturantId: string;
  name: string;
  visited: number;
  img: string;
  price: number;
  ingredients: string[];
  foodType: string[];
  DayPart: string;
  changes: String[];
  sides: string[];
}
const userSchema: Schema = new Schema<IDish>({
  name: { type: String, required: true },
  resturantId: { type: String, required: true },
  visited: { type: Number, default: 0 },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  foodType: { type: [String], required: false },
  DayPart: { type: String, default: "noon" },
  changes: { type: [String], required: false },
  sides: { type: [String], required: false },
});

const DishesModel: Model<IDish> = mongoose.model<IDish>("dishs", userSchema);

export default DishesModel;
