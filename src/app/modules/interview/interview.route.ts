/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { InterviewControllers } from "./interview.controller";

const router = express.Router();
router.get(
  "/",
  InterviewControllers.getAllInterview
);
router.post(
  "/",
  InterviewControllers.createInterview
);
router.get(
  "/:id",
  InterviewControllers.getSingleInterview
);

router.patch(
  "/:id",
  InterviewControllers.updateInterview
);


export const InterviewRoutes = router;
