import express from "express";
import restaurantsRoutes from "./routes/restaurant.routes";
import dishesRoutes from "./routes/dishs.routes";
import chefsRoutes from "./routes/chefs.routes";
import usersRoutes from "./routes/users.routes";

const router = express.Router();
router.use("/restaurants", restaurantsRoutes);
router.use("/dishes", dishesRoutes);
router.use("/chefs", chefsRoutes);
router.use("/users", usersRoutes);

export default router;
