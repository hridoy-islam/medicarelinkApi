import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { StarterChecklistServices } from "./starterCheckList.service";

const getAllStarterChecklist: RequestHandler = catchAsync(async (req, res) => {
  const result = await StarterChecklistServices.getAllStarterChecklistFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "StarterChecklists retrived succesfully",
    data: result,
  });
});
const getSingleStarterChecklist = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StarterChecklistServices.getSingleStarterChecklistFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "StarterChecklist is retrieved succesfully",
    data: result,
  });
});

const updateStarterChecklist = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StarterChecklistServices.updateStarterChecklistIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "StarterChecklist is updated succesfully",
    data: result,
  });
});

const createStarterChecklist: RequestHandler = catchAsync(async (req, res) => {
  const result = await StarterChecklistServices.createStarterChecklistIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "StarterChecklist created successfully",
    data: result,
  });
});

export const StarterChecklistControllers = {
  getAllStarterChecklist,
  getSingleStarterChecklist,
  updateStarterChecklist,
  createStarterChecklist
  
};
