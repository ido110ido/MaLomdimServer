import express from "express";
import {
  addNewMainSubject,
  getMainSubsList,
  getTodayMainSub,
  removeMainSubject,
  updateMainSubject,
  updateSubjectOrder,
} from "../../controller/mainSub/mainSub.controllers";
// const verify = require("../../verifay/verifay");
const router = express.Router();

router.get("/", getMainSubsList);
router.get("/today", getTodayMainSub);
// router.get("/singleSub", getSingleMainSub); // need id: string

//add
router.post("/", addNewMainSubject);
//update
router.post("/update", updateMainSubject); // need id: string, newTitle: string, numOfDays: number
router.post("/updateOrder", updateSubjectOrder); // need mainSubId: string , newBeforeMainSubId: string | null
//remove
router.delete("/", removeMainSubject); // need id: string
export default router;
