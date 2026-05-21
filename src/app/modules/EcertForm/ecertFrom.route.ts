/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { EcertFormControllers } from "./ecertFrom.controller";

const router = express.Router();
router.get(
  "/",
  EcertFormControllers.getAllEcertForm
);
router.post(
  "/",
  EcertFormControllers.createEcertForm
);
router.get(
  "/:id",
  EcertFormControllers.getSingleEcertForm
);

router.patch(
  "/:id",
  EcertFormControllers.updateEcertForm
);
router.delete(
  "/:id",
  EcertFormControllers.deleteSingleEcertForm
);


export const EcertFormRoutes = router;
