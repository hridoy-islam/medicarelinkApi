/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/multer";
import { BankDetailsControllers } from "./bankDetailsFrom.controller";

const router = express.Router();
router.get(
  "/",
  BankDetailsControllers.getAllBankDetails
);
router.post(
  "/",
  BankDetailsControllers.createBankDetails
);
router.get(
  "/:id",
  BankDetailsControllers.getSingleBankDetails
);

router.patch(
  "/:id",
  BankDetailsControllers.updateBankDetails
);


export const BankDetailsRoutes = router;
