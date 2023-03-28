import materialsModel, {
  IMaterials,
} from "../../model/materials/materials.model";
import { ListMainSubTopic } from "../subTopics/subTopics.services";

//admin remove one material
export const removeMaterial = async (id: string) => {
  try {
    await materialsModel.findByIdAndDelete(id);
    return materialsModel.find();
  } catch (error) {
    throw Error("Error while removing single Materials data");
  }
};
// user remove note
export const removeNoteMaterial = async (id: string, idMainSub: string) => {
  try {
    await materialsModel.findByIdAndDelete(id);
    return await getMainSubMaterials(idMainSub);
  } catch (error) {
    throw Error("Error while removing single Materials data");
  }
};
//admin add one material
export const addingMaterials = async (Materials: IMaterials) => {
  try {
    const _newMaterials = await materialsModel.create(Materials);
    _newMaterials.save();
    return await materialsModel.find();
  } catch (error:any) {
    throw Error("adding Materials failed :" + error.message);
  }
};
// user add note
export const addingNoteMaterials = async (
  idMainSub: string,
  Materials: IMaterials
) => {
  try {
    const _newMaterials = await materialsModel.create(Materials);
    _newMaterials.save();
    return await getMainSubMaterials(idMainSub);
  } catch (error: any) {
    throw Error("adding Materials failed: " + error.message);
  }
};
//admin update material
export const updateMaterials = async (id: string, Materials: IMaterials) => {
  try {
    await materialsModel.findByIdAndUpdate(id, Materials);
    return await materialsModel.find();
  } catch (error) {
    throw Error("update Materials failed");
  }
};
//user update note
export const updateNoteMaterials = async (
  idMainSub: string,
  id: string,
  Materials: IMaterials
) => {
  try {
    await materialsModel.findByIdAndUpdate(id, Materials);
    return await getMainSubMaterials(idMainSub);
  } catch (error) {
    throw Error("update Materials failed");
  }
};

//utilities- remove sub topic materials
//get all the sub Topic materials
export const getSubTopicsMaterials = async (subTopicID: string) => {
  try {
    const _Materials = await materialsModel.find();
    // const _Materials = await materialsModel.find({ idSubTopic: subTopicID });
    return _Materials;
  } catch (error) {
    throw Error("Error while getting sub topic Materials data");
  }
};
//remove
export const removeSubTopicMaterials = async (subTopicID: string) => {
  try {
    await materialsModel.deleteMany({ idSubTopic: subTopicID });
  } catch (error) {
    throw Error("Error while removing Materials data");
  }
};

const getMainSubMaterials = async (idMainSub: string) => {
  try {
    const subTopicIdList = await ListMainSubTopic(idMainSub);
    const _materialsList = subTopicIdList.map(async (subTopicId) => {
      const listOfMaterials = await getSubTopicsMaterials(subTopicId);
      return listOfMaterials || [];
    });
    return _materialsList.flat();
  } catch (error: any) {
    throw Error("something went wrong: " + error.message);
  }
};
