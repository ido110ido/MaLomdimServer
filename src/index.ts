import express from "express";
import mainSubRoutes from "./routes/mainSub/mainSub.routes";
import subTopicRoutes from "./routes/subTopic/subTopics.routes";
import materialRoutes from "./routes/material/material.routes";
import usersRoutes from "./routes/users/users.routes";

const router = express.Router();
router.use("/mainSub", mainSubRoutes);
router.use("/subTopics", subTopicRoutes);
router.use("/materials", materialRoutes);
router.use("/user", usersRoutes);
export default router;
