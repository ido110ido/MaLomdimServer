import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IMainSub {
  _id: string;
  title: string;
  description?: string;
  startDate: number;
  endDate: number;
  numOfDays: number;
  nextMainSub: String | null;
  head?: boolean;
}
const mainSubSchema: Schema = new Schema<IMainSub>({
  title: { type: String, required: true },
  numOfDays: { type: Number, required: true },
  description: { type: String, required: false },
  startDate: { type: Number, default: Date.now() },
  endDate: { type: Number, default: 0 },
  nextMainSub: { type: String || null, default: null },
  head: { type: Boolean, default: false },
});

const MainSubModel: Model<IMainSub> = mongoose.model<IMainSub>(
  "mainSub",
  mainSubSchema
);

export default MainSubModel;
