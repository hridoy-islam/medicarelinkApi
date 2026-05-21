import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { MedicalQuestionServices } from "./medicalQuestion.service";

const getAllMedicalQuestion: RequestHandler = catchAsync(async (req, res) => {
  const result = await MedicalQuestionServices.getAllMedicalQuestionFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "MedicalQuestions retrived succesfully",
    data: result,
  });
});
const getSingleMedicalQuestion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MedicalQuestionServices.getSingleMedicalQuestionFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "MedicalQuestion is retrieved succesfully",
    data: result,
  });
});

const updateMedicalQuestion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MedicalQuestionServices.updateMedicalQuestionIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "MedicalQuestion is updated succesfully",
    data: result,
  });
});

const createMedicalQuestion: RequestHandler = catchAsync(async (req, res) => {
  const result = await MedicalQuestionServices.createMedicalQuestionIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "MedicalQuestion created successfully",
    data: result,
  });
});

export const MedicalQuestionControllers = {
  getAllMedicalQuestion,
  getSingleMedicalQuestion,
  updateMedicalQuestion,
  createMedicalQuestion
  
};
