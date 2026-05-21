/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { MedicalQuestionControllers } from "./medicalQuestion.controller";

const router = express.Router();
router.get(
  "/",
  MedicalQuestionControllers.getAllMedicalQuestion
);
router.post(
  "/",
  MedicalQuestionControllers.createMedicalQuestion
);
router.get(
  "/:id",
  MedicalQuestionControllers.getSingleMedicalQuestion
);

router.patch(
  "/:id",
  MedicalQuestionControllers.updateMedicalQuestion
);


export const MedicalQuestionRoutes = router;
