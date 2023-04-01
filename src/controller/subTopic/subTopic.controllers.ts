import { Request, Response } from "express";
import {
  addingSubTopics,
  getMainSubSubTopic,
  removeMainSubTopics,
  removeOnlySubTopic,
  updateSubTopics,
} from "../../services/subTopics/subTopics.services";

//get controllers
export const getMainSubsTopic = async (req: Request, res: Response) => {
  try {
    const subTopics = await getMainSubSubTopic(req.body.id);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully Main Sub topic Retrieved",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// add controllers
export const addNewSubTopic = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const subTopics = await addingSubTopics(req.body);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully add sub topic",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
//update
export const updateSubTopic = async (req: Request, res: Response) => {
  try {
    const { id, title, idMainSub } = req.body;
    const subTopics = await updateSubTopics(id, title, idMainSub);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully change order of Main Subs",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
//remove
export const removeSubTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const subTopics = await removeOnlySubTopic(id);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully remove sub Topic",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
export const removeMainSubTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const subTopics = await removeMainSubTopics(id);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully remove Main subTopic",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
