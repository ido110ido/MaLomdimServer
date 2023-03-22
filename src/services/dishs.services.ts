import DishesModel from "../model/dishs.model";
export interface IDIshAction {
  resturantId: string;
  DayPart: "Breakfast" | "Launch" | "Dinner";
}
exports.getDishes = async (query: IDIshAction) => {
  try {
    // const _dishes = await DishesModel.find(query);
    const _dishes = await DishesModel.find();
    return _dishes;
  } catch (error) {
    throw Error("Error while getting dishes data");
  }
};
exports.getSingleDish = async (id: string) => {
  try {
    const _dishes = await DishesModel.findById(id);
    return _dishes;
  } catch (error) {
    throw Error("Error while getting the dishe data");
  }
};
exports.removeDish = async (id: string) => {
  try {
    await DishesModel.findByIdAndDelete(id);
    return DishesModel.find();
  } catch (error) {
    throw Error("Error while getting restaurants data");
  }
};
