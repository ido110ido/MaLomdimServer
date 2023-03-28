import mongoose from "mongoose";
import { Schema, Document, Model } from "mongoose";
export interface IMaterials {
  idSubTopic: string;
  title: string;
  description: string;
  body: string;
  category: string;
  codeType: string;
}
const materialsSchema: Schema = new Schema<IMaterials>({
  idSubTopic: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  body: { type: String, required: true },
  category: { type: String, required: true },
  codeType: { type: String, required: false },
});

const materialsModel: Model<IMaterials> = mongoose.model<IMaterials>(
  "material",
  materialsSchema
);

export default materialsModel;
