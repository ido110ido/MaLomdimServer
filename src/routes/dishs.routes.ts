import express from "express";
const dishesController = require("../controller/dishs/dishs.controllers");
const verify = require("../verifay/verifay");
const router = express.Router();
router.get("/", dishesController.getDishes);
router.delete("/", verify.adminVerify("admin"), dishesController.removeDish);
export default router;
