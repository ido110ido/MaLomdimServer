import express from "express";
const usersController = require("../controller/users/users.controllers");
const router = express.Router();

router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);
export default router;
