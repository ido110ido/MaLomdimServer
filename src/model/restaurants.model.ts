import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IRestaurants {
  chefId: string;
  name: string;
  visited: number;
  img: string;
  startDate: string;
  about: string;
  openHour: number;
  closeHour: number;
  latitude: number;
  longitude: number;
  rating: number;
}
const userSchema: Schema = new Schema<IRestaurants>({
  chefId: { type: String, required: true },
  name: { type: String, required: true },
  visited: { type: Number, default: 0 },
  img: { type: String, required: true },
  startDate: { type: String, required: true },
  about: { type: String, required: true },
  openHour: { type: Number, required: true },
  closeHour: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  rating: { type: Number, default: 3 },
});

const RestaurantsModel: Model<IRestaurants> = mongoose.model<IRestaurants>(
  "resturants",
  userSchema
);

export default RestaurantsModel;
