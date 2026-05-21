/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { ReferenceControllers } from "./reference.controller";

const router = express.Router();
router.get(
  "/",
  ReferenceControllers.getAllReference
);
router.post(
  "/",
  ReferenceControllers.createReference
);
router.get(
  "/:id",
  ReferenceControllers.getSingleReference
);

router.patch(
  "/:id",
  ReferenceControllers.updateReference
);


export const ReferenceRoutes = router;
