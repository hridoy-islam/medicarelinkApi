import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BankDetailsServices } from "./bankDetailsFrom.service";

const getAllBankDetails: RequestHandler = catchAsync(async (req, res) => {
  const result = await BankDetailsServices.getAllBankDetailsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BankDetailss retrived succesfully",
    data: result,
  });
});
const getSingleBankDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BankDetailsServices.getSingleBankDetailsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BankDetails is retrieved succesfully",
    data: result,
  });
});

const updateBankDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BankDetailsServices.updateBankDetailsIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "BankDetails is updated succesfully",
    data: result,
  });
});

const createBankDetails: RequestHandler = catchAsync(async (req, res) => {
  const result = await BankDetailsServices.createBankDetailsIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "BankDetails created successfully",
    data: result,
  });
});

export const BankDetailsControllers = {
  getAllBankDetails,
  getSingleBankDetails,
  updateBankDetails,
  createBankDetails
  
};
