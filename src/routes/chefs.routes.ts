import express from "express";
const chefsController = require("../controller/chefs/chefs.controllers");
const verify = require("../verifay/verifay");
const router = express.Router();

router.get("/", chefsController.getChefs);
router.post("/", chefsController.getSingleChefs);
router.post("/add", chefsController.addingChef);
router.delete("/", verify.adminVerify("admin"), chefsController.removeChef);
export default router;
