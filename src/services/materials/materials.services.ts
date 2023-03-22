import materialsModel, {
  IMaterials,
} from "../../model/materials/materials.model";

exports.getSubTopicsMaterials = async (subTopicID: string) => {
  try {
    const _Materials = await materialsModel.find({ idSubTopic: subTopicID });
    return _Materials;
  } catch (error) {
    throw Error("Error while getting sub topic Materials data");
  }
};

exports.removeAllSubTopicMaterials = async (subTopicID: string) => {
  try {
    await materialsModel.deleteMany({ idSubTopic: subTopicID });
  } catch (error) {
    throw Error("Error while removing Materials data");
  }
};
exports.removeOneMaterial = async (idSubTopic: string, id: string) => {
  try {
    await materialsModel.findByIdAndDelete(id);
    return materialsModel.find({ idSubTopic: idSubTopic });
  } catch (error) {
    throw Error("Error while removing single Materials data");
  }
};
exports.addingMaterials = async (Materials: IMaterials) => {
  try {
    const _newMaterials = await materialsModel.create(Materials);
    _newMaterials.save();
    return await materialsModel.find({ idSubTopic: _newMaterials.idSubTopic });
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
