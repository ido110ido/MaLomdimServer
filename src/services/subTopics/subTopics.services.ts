import subTopicsModel, {
  ISubTopics,
} from "../../model/subTopics/subTopics.model";
import { removeSubTopicMaterials } from "../materials/materials.services";

//get a main sub SubTopics list
export const getMainSubSubTopic = async (mainSubID: string) => {
  try {
    const _subTopics = await subTopicsModel.find({ idMainSub: mainSubID });
    return _subTopics;
  } catch (error) {
    throw Error("Error while getting main sub subTopics data");
  }
};
//remove a main sub sub topics, delete also related materials
export const removeMainSubTopics = async (mainSubID: string) => {
  try {
    //remove all materials of main sub
    const listMainSubTopics = await subTopicsModel.find({
      idMainSub: mainSubID,
    });
    listMainSubTopics.forEach(
      async (subTopic) => await removeSubTopicMaterials(subTopic._id.toString())
    );
    //remove sub topics
    await subTopicsModel.deleteMany({ idMainSub: mainSubID });
  } catch (error) {
    throw Error("Error while removing main sub subTopics data");
  }
};
// add a subTopic
export const addingSubTopics = async (subTopics: ISubTopics) => {
  try {
    const _newSubTopics = await subTopicsModel.create(subTopics);
    _newSubTopics.save();
    return await subTopicsModel.find();
  } catch (error) {
    throw Error("adding subTopics failed");
  }
};
//update sub topic
export const updateSubTopics = async (id: string, subTopics: ISubTopics) => {
  try {
    await subTopicsModel.findByIdAndUpdate(id, subTopics);
    return await subTopicsModel.find();
  } catch (error) {
    throw Error("update subTopics failed");
  }
};
export const ListSubTopicOfMaterial = async (mainSubID: string) => {
  try {
    const listOfIdSubTopic: string[] = (
      await subTopicsModel.find({ idMainSub: mainSubID })
    ).map((subTopic) => subTopic._id.toString());
    return listOfIdSubTopic;
  } catch (error) {
    throw Error("update subTopics failed");
  }
};
