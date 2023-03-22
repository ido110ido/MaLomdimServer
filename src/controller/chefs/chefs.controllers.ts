import { Request, Response } from "express";
const chefsServices = require("../../services/chefs.services");
exports.getChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await chefsServices.getChefs();
    return res.status(200).json({
      status: 200,
      data: chefs,
      message: "Successfully chefs Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getSingleChefs = async (req: Request, res: Response) => {
  try {
    const chef = await chefsServices.getSingleChefs(req.body.id);
    return res.status(200).json({
      status: 200,
      data: chef,
      message: "Successfully chef Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.removeChef = async (req: Request, res: Response) => {
  try {
    const chefs = await chefsServices.removeChef(req.body.id);
    return res.status(200).json({
      status: 200,
      data: chefs,
      message: "Successfully removed chef",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.addingChef = async (req: Request, res: Response) => {
  try {
    const chefs = await chefsServices.addingChef(req.body.data);
    return res.status(200).json({
      status: 200,
      data: chefs,
      message: "Successfully add chef",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
