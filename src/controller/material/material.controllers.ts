import { Request, Response } from "express";
import {
  addingManyMaterials,
  addingMaterials,
  addingNoteMaterials,
  getSubTopicsMaterials,
  removeMaterial,
  removeNoteMaterial,
  updateMaterials,
  updateNoteMaterials,
} from "../../services/materials/materials.services";
//get
export const getMaterialsTeacher = async (req: Request, res: Response) => {
  try {
    const material = await getSubTopicsMaterials(req.body);
    return res.status(200).json({
      status: 200,
      data: material,
      message: "Successfully get material",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
//remove
export const removeMaterialsTeacher = async (req: Request, res: Response) => {
  try {
    const material = await removeMaterial(req.body.id);
    return res.status(200).json({
      status: 200,
      data: material,
      message: "Successfully remove material",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
export const removeMaterialsStudent = async (req: Request, res: Response) => {
  try {
    const { id, idMainSub } = req.body;
    const material = await removeNoteMaterial(id, idMainSub);
    return res.status(200).json({
      status: 200,
      data: material,
      message: "Successfully remove material",
    });
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// add controllers
export const addNewMaterialTeacher = async (req: Request, res: Response) => {
  try {
    const subTopics = await addingMaterials(req.body);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully add material",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
export const addNewManyMaterialTeacher = async (
  req: Request,
  res: Response
) => {
  try {
    const subTopics = await addingManyMaterials(req.body);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully added many material",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
export const addNewMaterialStudent = async (req: Request, res: Response) => {
  try {
    const { idMainSub, Materials } = req.body;
    const subTopics = await addingNoteMaterials(idMainSub, Materials);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully add material",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
//update
export const updateMaterialTeacher = async (req: Request, res: Response) => {
  try {
    const { id, Materials } = req.body;
    const subTopics = await updateMaterials(id, Materials);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully update material",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
export const updateMaterialStudent = async (req: Request, res: Response) => {
  try {
    const { idMainSub, id, Materials } = req.body;
    const subTopics = await updateNoteMaterials(idMainSub, id, Materials);
    return res.status(200).json({
      status: 200,
      data: subTopics,
      message: "Successfully update material",
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
