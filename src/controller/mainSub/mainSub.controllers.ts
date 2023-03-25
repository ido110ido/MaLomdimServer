import { Request, Response } from "express";
import {
  addingMainSub,
  getMainSubs,
  getSingleMainSubData,
  getTodayMainSubMaterials,
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

// exports.getSingleChefs = async (req: Request, res: Response) => {
//   try {
//     const chef = await chefsServices.getSingleChefs(req.body.id);
//     return res.status(200).json({
//       status: 200,
//       data: chef,
//       message: "Successfully chef Retrieved",
//     });
//   } catch (e: any) {
//     return res.status(400).json({ status: 400, message: e.message });
//   }
// };
// exports.removeChef = async (req: Request, res: Response) => {
//   try {
//     const chefs = await chefsServices.removeChef(req.body.id);
//     return res.status(200).json({
//       status: 200,
//       data: chefs,
//       message: "Successfully removed chef",
//     });
//   } catch (e: any) {
//     return res.status(400).json({ status: 400, message: e.message });
//   }
// };
