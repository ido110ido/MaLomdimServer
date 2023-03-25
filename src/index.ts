import express from "express";
import mainSubRoutes from "./routes/mainSub.routes";

const router = express.Router();
router.use("/mainSub", mainSubRoutes);

export default router;
