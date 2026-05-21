/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { StarterChecklistControllers } from "./starterCheckList.controller";

const router = express.Router();
router.get(
  "/",
  StarterChecklistControllers.getAllStarterChecklist
);
router.post(
  "/",
  StarterChecklistControllers.createStarterChecklist
);
router.get(
  "/:id",
  StarterChecklistControllers.getSingleStarterChecklist
);

router.patch(
  "/:id",
  StarterChecklistControllers.updateStarterChecklist
);


export const StarterChecklistRoutes = router;
