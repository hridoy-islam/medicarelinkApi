import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { EcertFormServices } from "./ecertFrom.service";

const getAllEcertForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await EcertFormServices.getAllEcertFormFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EcertForms retrived succesfully",
    data: result,
  });
});
const getSingleEcertForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EcertFormServices.getSingleEcertFormFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EcertForm is retrieved succesfully",
    data: result,
  });
});

const updateEcertForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EcertFormServices.updateEcertFormIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EcertForm is updated succesfully",
    data: result,
  });
});

const createEcertForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await EcertFormServices.createEcertFormIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "EcertForm created successfully",
    data: result,
  });
});


const deleteSingleEcertForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EcertFormServices.deleteEcertFormIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "EcertForm is delete succesfully",
    data: result,
  });
});


export const EcertFormControllers = {
  getAllEcertForm,
  getSingleEcertForm,
  updateEcertForm,
  createEcertForm,
  deleteSingleEcertForm
  
};
