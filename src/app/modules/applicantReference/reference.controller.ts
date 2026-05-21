import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ReferenceServices } from "./reference.service";

const getAllReference: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReferenceServices.getAllReferenceFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "References retrived succesfully",
    data: result,
  });
});
const getSingleReference = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReferenceServices.getSingleReferenceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reference is retrieved succesfully",
    data: result,
  });
});

const updateReference = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReferenceServices.updateReferenceIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reference is updated succesfully",
    data: result,
  });
});

const createReference: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReferenceServices.createReferenceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Reference created successfully",
    data: result,
  });
});

export const ReferenceControllers = {
  getAllReference,
  getSingleReference,
  updateReference,
  createReference
  
};
