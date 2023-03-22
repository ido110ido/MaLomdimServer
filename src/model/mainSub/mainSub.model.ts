import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IMainSub {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
const mainSubSchema: Schema = new Schema<IMainSub>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

const MainSubModel: Model<IMainSub> = mongoose.model<IMainSub>(
  "mainSub",
  mainSubSchema
);

export default MainSubModel;
