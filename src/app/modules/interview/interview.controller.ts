import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { InterviewServices } from "./interview.service";

const getAllInterview: RequestHandler = catchAsync(async (req, res) => {
  const result = await InterviewServices.getAllInterviewFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Interviews retrived succesfully",
    data: result,
  });
});
const getSingleInterview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InterviewServices.getSingleInterviewFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Interview is retrieved succesfully",
    data: result,
  });
});

const updateInterview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InterviewServices.updateInterviewIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Interview is updated succesfully",
    data: result,
  });
});

const createInterview: RequestHandler = catchAsync(async (req, res) => {
  const result = await InterviewServices.createInterviewIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Interview created successfully",
    data: result,
  });
});

export const InterviewControllers = {
  getAllInterview,
  getSingleInterview,
  updateInterview,
  createInterview
  
};
