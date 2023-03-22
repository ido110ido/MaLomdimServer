import subTopicsModel, {
  ISubTopics,
} from "../../model/subTopics/subTopics.model";

exports.getMainSubSubTopic = async (mainSubID: string) => {
  try {
    const _subTopics = await subTopicsModel.find({ idMainSub: mainSubID });
    return _subTopics;
  } catch (error) {
    throw Error("Error while getting main sub subTopics data");
  }
};

exports.removeAllMainSubSubTopics = async (mainSubID: string) => {
  try {
    await subTopicsModel.deleteMany({ idMainSub: mainSubID });
    return subTopicsModel.find({ idMainSub: mainSubID });
  } catch (error) {
    throw Error("Error while removing main sub subTopics data");
  }
};
exports.removeOneMainSubSubTopics = async (mainSubID: string, id: string) => {
  try {
    await subTopicsModel.findByIdAndDelete({ idMainSub: mainSubID });
    return subTopicsModel.find({ idMainSub: mainSubID });
  } catch (error) {
    throw Error("Error while removing single main sub subTopic data");
  }
};
exports.addingSubTopics = async (subTopics: ISubTopics) => {
  try {
    const _newSubTopics = await subTopicsModel.create(subTopics);
    _newSubTopics.save();
    return await subTopicsModel.find({ idMainSub: subTopics.idMainSub });
  } catch (error) {
    throw Error("adding subTopics failed");
  }
};
exports.updateSubTopics = async (id: string, subTopics: ISubTopics) => {
  try {
    await subTopicsModel.findByIdAndUpdate(id, subTopics);
    return await subTopicsModel.find({ idMainSub: subTopics.idMainSub });
  } catch (error) {
    throw Error("update subTopics failed");
  }
};
