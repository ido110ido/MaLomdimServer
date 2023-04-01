import express from "express";
import {
  addNewSubTopic,
  getMainSubsTopic,
  removeMainSubTopic,
  removeSubTopic,
  updateSubTopic,
} from "../../controller/subTopic/subTopic.controllers";

import { adminVerify } from "../../verifay/verifay";
const router = express.Router();

router.get("/", getMainSubsTopic);
//add
router.post("/", adminVerify("teacher"), addNewSubTopic);
//update
router.post("/update", updateSubTopic); // need id: string, title: string, idMainSub: number
//remove
router.delete("/", adminVerify("teacher"), removeSubTopic); // need id: string
export default router;
