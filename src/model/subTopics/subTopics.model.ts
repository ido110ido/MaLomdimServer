import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface ISubTopics {
  idMainSub: string;
  title: string;
  description: string;
}
const subTopicsSchema: Schema = new Schema<ISubTopics>({
  idMainSub: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
});

const subTopicsModel: Model<ISubTopics> = mongoose.model<ISubTopics>(
  "subTopics",
  subTopicsSchema
);

export default subTopicsModel;
