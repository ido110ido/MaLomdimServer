import express from "express";
import {
  addNewSubTopic,
  getMainSubsTopic,
  removeMainSubTopic,
  removeSubTopic,
  updateSubTopic,
} from "../../controller/subTopic/subTopic.controllers";

// const verify = require("../verifay/verifay");
const router = express.Router();

router.get("/", getMainSubsTopic);
//add
router.post("/", addNewSubTopic);
//update
router.post("/update", updateSubTopic); // need id: string, title: string, idMainSub: number
//remove
router.delete("/", removeSubTopic); // need id: string
export default router;
