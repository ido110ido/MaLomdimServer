import express from "express";
import {
  addNewMainSubject,
  getMainSubsList,
  getSingleMainSub,
  getTodayMainSub,
} from "../controller/mainSub/mainSub.controllers";
const verify = require("../verifay/verifay");
const router = express.Router();

router.get("/", getTodayMainSub);
router.get("/list", getMainSubsList);
router.get("/change", getSingleMainSub);
router.post("/", addNewMainSubject);
// router.post("/add", chefsController.addingChef);
// router.delete("/", verify.adminVerify("admin"), chefsController.removeChef);
export default router;
