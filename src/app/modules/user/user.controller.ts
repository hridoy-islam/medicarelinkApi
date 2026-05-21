import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.service";

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrived succesfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
  const { fields } = req.query; // e.g., "ref1Submit,ref2Submit"

  let fieldList = '';
  if (fields && typeof fields === 'string') {
    // Remove any spaces and split by commas
    const selectedFields = fields.split(',').map(field => field.trim()).filter(Boolean);
    fieldList = selectedFields.join(' ');
  }

  const result = await UserServices.getSingleUserFromDB(id, fieldList);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved succesfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated succesfully",
    data: result,
  });
});



export const UserControllers = {
  getAllUser,
  getSingleUser,
  updateUser,
  
};
