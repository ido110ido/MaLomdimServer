import { Request, Response } from "express";
import {
  addingMainSub,
  getMainSubs,
  getSingleMainSubData,
  getTodayMainSubMaterials,
  removeMainSub,
  updateMainSub,
  updateMainSubOrder,
} from "../../services/mainSub/mainSub.services";
//get controllers
export const getMainSubsList = async (req: Request, res: Response) => {
  try {
    console.log("a");
    const mainSubs = await getMainSubs();
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully Main Subs List Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
export const getSingleMainSub = async (req: Request, res: Response) => {
  try {
    // Get the 'id' parameter from the request URL
    const mainSubs = await getSingleMainSubData(req.body.id);
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully one Main Subs List Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
export const getTodayMainSub = async (req: Request, res: Response) => {
  try {
    // Get the 'id' parameter from the request URL
    const mainSubs = await getTodayMainSubMaterials();
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully today Main Subs List Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
//add controllers
export const addNewMainSubject = async (req: Request, res: Response) => {
  try {
    const mainSubs = await addingMainSub(req.body);
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully add Main Sub",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
//update
export const updateSubjectOrder = async (req: Request, res: Response) => {
  try {
    const { mainSubId, newBeforeMainSubId } = req.body;
    const mainSubs = await updateMainSubOrder(mainSubId, newBeforeMainSubId);
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully change order of Main Subs",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
export const updateMainSubject = async (req: Request, res: Response) => {
  try {
    const { id, newTitle, numOfDays } = req.body;
    const mainSubs = await updateMainSub(id, newTitle, numOfDays);
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully updated Main Sub",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
//remove
export const removeMainSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const mainSubs = await removeMainSub(id);
    return res.status(200).json({
      status: 200,
      data: mainSubs,
      message: "Successfully remove Main Sub",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
