import { Request, Response } from "express";
const restaurantsServices = require("../../services/restaurants.services");
exports.getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantsServices.getRestaurants();
    return res.status(200).json({
      status: 200,
      data: restaurants,
      message: "Succesfully restaurants Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getSingleRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantsServices.getSingleRestaurants(
      req.body.id
    );
    return res.status(200).json({
      status: 200,
      data: restaurants,
      message: "Successfully restaurants Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.removeRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantsServices.removeRestaurant(req.body.id);
    return res.status(200).json({
      status: 200,
      data: restaurants,
      message: "Successfully remove restaurant",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.addingRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantsServices.addingRestaurant(
      req.body.data
    );
    return res.status(200).json({
      status: 200,
      data: restaurants,
      message: "Successfully add restaurant",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
