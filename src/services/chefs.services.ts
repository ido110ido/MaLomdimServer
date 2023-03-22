import ChefsModel, { IChef } from "../model/chefs.model";
exports.getChefs = async () => {
  try {
    const _chefs = await ChefsModel.find();
    return _chefs;
  } catch (error) {
    throw Error("Error while getting chefs data");
  }
};
exports.getSingleChefs = async (id: string) => {
  try {
    const _chefs = await ChefsModel.findById(id);
    return _chefs;
  } catch (error) {
    throw Error("Error while getting the chef data");
  }
};
exports.removeChef = async (id: string) => {
  try {
    await ChefsModel.findByIdAndDelete(id);
    return await ChefsModel.find();
  } catch (error) {
    throw Error("not found chef to remove");
  }
};
exports.addingChef = async (chef: IChef) => {
  try {
    const _chef = await ChefsModel.create(chef);
    _chef.save();
    return await ChefsModel.find();
  } catch (error) {
    throw Error("adding chef failed");
  }
};
