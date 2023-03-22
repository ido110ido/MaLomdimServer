import { Request, Response } from "express";
const DishesServices = require("../../services/dishs.services");
exports.getDishes = async (req: Request, res: Response) => {
  try {
    const Dishes = await DishesServices.getDishes(req.body);
    return res.status(200).json({
      status: 200,
      data: Dishes,
      message: "Succesfully Dishes Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getQueryDishes = async (req: Request, res: Response) => {
  try {
    // const Dishes = await DishesServices.getSingleDish(req.body);
    const Dishes = await DishesServices.getSingleDish();
    return res.status(200).json({
      status: 200,
      data: Dishes,
      message: "Succesfully Dish Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.removeDish = async (req: Request, res: Response) => {
  try {
    const restaurants = await DishesServices.removeDish(req.body.id);
    return res.status(200).json({
      status: 200,
      data: restaurants,
      message: "Successfully removed Dish",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
