import materialsModel, {
  IMaterials,
} from "../../model/materials/materials.model";
import { ListSubTopicOfMaterial } from "../subTopics/subTopics.services";

//get all the sub Topic materials
export const getSubTopicsMaterials = async (subTopicID: string) => {
  try {
    const _Materials = await materialsModel.find({ idSubTopic: subTopicID });
    return _Materials;
  } catch (error) {
    throw Error("Error while getting sub topic Materials data");
  }
};
//remove sub topic materials
export const removeSubTopicMaterials = async (subTopicID: string) => {
  try {
    await materialsModel.deleteMany({ idSubTopic: subTopicID });
  } catch (error) {
    throw Error("Error while removing Materials data");
  }
};
//remove one material
export const removeMaterial = async (id: string) => {
  try {
    await materialsModel.findByIdAndDelete(id);
    return materialsModel.find();
  } catch (error) {
    throw Error("Error while removing single Materials data");
  }
};
export const addingMaterials = async (Materials: IMaterials) => {
  try {
    const _newMaterials = await materialsModel.create(Materials);
    _newMaterials.save();
    return await materialsModel.find();
  } catch (error) {
    throw Error("adding Materials failed");
  }
};
exports.updateMaterials = async (id: string, Materials: IMaterials) => {
  try {
    await materialsModel.findByIdAndUpdate(id, Materials);
    return await materialsModel.find({ idSubTopic: Materials.idSubTopic });
  } catch (error) {
    throw Error("update Materials failed");
  }
};

//main subject function
exports.getMainSubMaterials = async (mainSubID: string) => {
  try {
    const listOfIdSubTopic = await ListSubTopicOfMaterial(mainSubID);
    const _materialsList = await Promise.all(
      listOfIdSubTopic.map(async (subTopicId) => {
        const listOfMaterials = await materialsModel.find({
          idSubTopic: subTopicId,
        });
        return listOfMaterials || [];
      })
    );
    return _materialsList.flat();
  } catch (error) {
    throw Error("Error while getting main sub Materials data");
  }
};
exports.removeAllMainSubMaterials = async (mainSubID: string) => {
  try {
    await materialsModel.deleteMany({ idMainSub: mainSubID });
  } catch (error) {
    throw Error("Error while removing Materials data");
  }
};

//
