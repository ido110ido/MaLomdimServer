import RestaurantsModel, { IRestaurants } from "../model/restaurants.model";
import DishesModel from "../model/dishs.model";

exports.getRestaurants = async () => {
  try {
    const _restaurants = await RestaurantsModel.find();
    return _restaurants;
  } catch (error) {
    throw Error("Error while getting restaurants data");
  }
};
exports.getSingleRestaurants = async (id: string) => {
  try {
    const _restaurants = await RestaurantsModel.findById(id);
    return _restaurants;
  } catch (error) {
    throw Error("Error while getting restaurants data");
  }
};
exports.removeRestaurant = async (id: string) => {
  try {
    await DishesModel.deleteMany({ resturantId: id });
    await RestaurantsModel.findByIdAndRemove(id);
    return RestaurantsModel.find();
  } catch (error) {
    throw Error("Error while getting restaurants data");
  }
};
exports.addingRestaurant = async (chef: IRestaurants) => {
  try {
    const _restaurants = await RestaurantsModel.create(chef);
    _restaurants.save();
    return await RestaurantsModel.find();
  } catch (error) {
    throw Error("adding restaurants failed");
  }
};
