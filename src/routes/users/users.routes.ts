import express from "express";
const usersController = require("../../controller/users/users.controllers");
import { adminVerify } from "../../verifay/verifay";
const router = express.Router();
router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);
//student handlers
router.get("/student", adminVerify("teacher"), usersController.getStudent);
router.post("/student", adminVerify("teacher"), usersController.addingStudent);
router.delete(
  "/student",
  adminVerify("teacher"),
  usersController.removingStudent
);
export default router;
