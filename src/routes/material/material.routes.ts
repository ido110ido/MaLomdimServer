import express from "express";
import {
  addNewManyMaterialTeacher,
  addNewMaterial,
  getMaterialsTeacher,
  removeMaterialsStudent,
  removeMaterialsTeacher,
  updateMaterialStudent,
  updateMaterialTeacher,
} from "../../controller/material/material.controllers";
import { adminVerify } from "../../verifay/verifay";

// const verify = require("../verifay/verifay");
const router = express.Router();
//get
router.get("/", getMaterialsTeacher);
//add
router.post("/many", adminVerify("teacher"), addNewManyMaterialTeacher);
router.post("/", adminVerify("student"), addNewMaterial); // need idMainSub:string
//update
router.post("/teacher/update", adminVerify("teacher"), updateMaterialTeacher); // need id: string, title: string, idMainSub: number
router.post("/update", adminVerify("student"), updateMaterialStudent); // need id: string, title: string, idMainSub: number ,idMainSub:string
//remove
router.delete("/teacher", adminVerify("teacher"), removeMaterialsTeacher); // need id: string
router.delete("/", adminVerify("student"), removeMaterialsStudent); // need id: string, idMainSub:string
export default router;
