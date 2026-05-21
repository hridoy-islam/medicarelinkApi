import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { EcertServices } from "./ecert.service";

const getAllEcert: RequestHandler = catchAsync(async (req, res) => {
  const result = await EcertServices.getAllEcertFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ecerts retrived succesfully",
    data: result,
  });
});
const getSingleEcert = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EcertServices.getSingleEcertFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ecert is retrieved succesfully",
    data: result,
  });
});

const updateEcert = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EcertServices.updateEcertIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ecert is updated succesfully",
    data: result,
  });
});

const createEcert: RequestHandler = catchAsync(async (req, res) => {
  const result = await EcertServices.createEcertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Ecert created successfully",
    data: result,
  });
});

const deleteEcert = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EcertServices.deleteEcertIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ecert is deleted succesfully",
    data: result,
  });
});

export const EcertControllers = {
  getAllEcert,
  getSingleEcert,
  updateEcert,
  createEcert,
  deleteEcert
  
};
