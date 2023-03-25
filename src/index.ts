import express from "express";
import mainSubRoutes from "./routes/mainSub/mainSub.routes";
import subTopicRoutes from "./routes/subTopic/subTopics.routes";
import materialRoutes from "./routes/material/material.routes";

const router = express.Router();
router.use("/mainSub", mainSubRoutes);
router.use("/subTopics", subTopicRoutes);
router.use("/materials", materialRoutes);
export default router;
