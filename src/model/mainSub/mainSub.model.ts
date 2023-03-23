import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IMainSub {
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  nextMainSub: string;
  head: boolean;
}
const mainSubSchema: Schema = new Schema<IMainSub>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  startDate: { type: Number, required: true },
  endDate: { type: Number, required: true },
  nextMainSub: { type: String, default: null },
  head: { type: Boolean, default: false },
});

const MainSubModel: Model<IMainSub> = mongoose.model<IMainSub>(
  "mainSub",
  mainSubSchema
);

export default MainSubModel;
