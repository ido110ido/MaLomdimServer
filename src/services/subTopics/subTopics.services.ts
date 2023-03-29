import subTopicsModel, {
  ISubTopics,
} from "../../model/subTopics/subTopics.model";
import { removeSubTopicMaterials } from "../materials/materials.services";

//get a main sub SubTopics list or all
export const getMainSubSubTopic = async (mainSubID: string) => {
  try {
    const _subTopics = await subTopicsModel.find();
    return _subTopics;
  } catch (error) {
    throw Error("Error while getting main sub subTopics data");
  }
};
// add a subTopic
export const addingSubTopics = async (subTopics: ISubTopics) => {
  try {
    const _newSubTopics = await subTopicsModel.create(subTopics);
    _newSubTopics.save();
    return {
      subTopicsList: await subTopicsModel.find(),
      addedSubTopic: _newSubTopics._id.toString(),
    };
  } catch (error: any) {
    throw Error("adding subTopics failed: " + error.message);
  }
};

//update sub topic
export const updateSubTopics = async (
  id: string,
  title: string,
  idMainSub?: string
) => {
  try {
    if (idMainSub) {
      await subTopicsModel.findByIdAndUpdate(id, {
        $set: { title: title, idMainSub: idMainSub },
      });
    } else {
      await subTopicsModel.findByIdAndUpdate(id, { $set: { title: title } });
    }
    return await subTopicsModel.find();
  } catch (error) {
    throw Error("update subTopics failed");
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
    return await subTopicsModel.find();
  } catch (error) {
    throw Error("Error while removing main sub subTopics data");
  }
};
//remove one sub sub topics, delete also related materials
export const removeOnlySubTopic = async (subTopicId: string) => {
  try {
    //remove all materials of main sub
    await removeSubTopicMaterials(subTopicId);
    //remove sub topics
    await subTopicsModel.findByIdAndDelete(subTopicId);
    return await subTopicsModel.find();
  } catch (error) {
    throw Error("Error while removing sub Topics data");
  }
};

//utilities - not going to routers only between services
export const ListMainSubTopic = async (mainSubID: string) => {
  try {
    const listOfIdSubTopic: string[] = (
      await subTopicsModel.find({ idMainSub: mainSubID })
    ).map((subTopic) => subTopic._id.toString());
    return listOfIdSubTopic;
  } catch (error) {
    throw Error("update subTopics failed");
  }
};
