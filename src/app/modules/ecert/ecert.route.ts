/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { EcertControllers } from "./ecert.controller";

const router = express.Router();
router.get(
  "/",
  EcertControllers.getAllEcert
);
router.post(
  "/",
  EcertControllers.createEcert
);
router.get(
  "/:id",
  EcertControllers.getSingleEcert
);

router.patch(
  "/:id",
  EcertControllers.updateEcert
);
router.delete(
  "/:id",
  EcertControllers.deleteEcert
);


export const EcertRoutes = router;
