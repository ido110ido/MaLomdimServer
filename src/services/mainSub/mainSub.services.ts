import MainSubModel, { IMainSub } from "../../model/mainSub/mainSub.model";
import subTopicsModel from "../../model/subTopics/subTopics.model";

exports.getMainSubs = async () => {
  try {
    const _mainSubs = await MainSubModel.find();
    return _mainSubs;
  } catch (error) {
    throw Error("Error while getting main subjects data");
  }
};
exports.getSingleMainSub = async (id: string) => {
  try {
    const _mainSub = await MainSubModel.findById(id);
    return _mainSub;
  } catch (error) {
    throw Error("Error while getting single mainSubject data");
  }
};
exports.removeMainSub = async (id: string) => {
  try {
    await subTopicsModel.deleteMany({ idMainSub: id });
    await MainSubModel.findByIdAndRemove(id);
    return MainSubModel.find();
  } catch (error) {
    throw Error("Error while removing main subject data");
  }
};
exports.addingMainSub = async (mainSub: IMainSub) => {
  try {
    const _newMainSub = await MainSubModel.create(mainSub);
    _newMainSub.save();
    return await MainSubModel.find();
  } catch (error) {
    throw Error("adding main subject failed");
  }
};
exports.updateMainSub = async (id: string, mainSub: IMainSub) => {
  try {
    await MainSubModel.findByIdAndUpdate(id, mainSub);
    return await MainSubModel.find();
  } catch (error) {
    throw Error("update main subject failed");
  }
};
