import express from "express";
const restaurantsController = require("../controller/restaurants/restaurants.controllers");
const verify = require("../verifay/verifay");
const router = express.Router();

router.get("/", restaurantsController.getRestaurants);
router.post("/", restaurantsController.getSingleRestaurants);
router.post("/add", restaurantsController.addingRestaurant);
router.delete(
  "/",
  verify.adminVerify("admin"),
  restaurantsController.removeRestaurant
);
export default router;
