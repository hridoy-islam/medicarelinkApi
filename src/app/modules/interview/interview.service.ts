import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Interview } from "./interview.model";
import { TInterview } from "./interview.interface";
import { InterviewSearchableFields } from "./interview.constant";

const getAllInterviewFromDB = async (query: Record<string, unknown>) => {
  const InterviewQuery = new QueryBuilder(Interview.find(), query)
    .search(InterviewSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await InterviewQuery.countTotal();
  const result = await InterviewQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleInterviewFromDB = async (id: string) => {
  const result = await Interview.findById(id);
  return result;
};

const updateInterviewIntoDB = async (id: string, payload: Partial<TInterview>) => {
  const interview = await Interview.findById(id);
  if (!interview) {
    throw new AppError(httpStatus.NOT_FOUND, "Interview not found");
  }

  const result = await Interview.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createInterviewIntoDB = async (payload: Partial<TInterview>) => {
  const result = await Interview.create(payload);
  return result;
};




export const InterviewServices = {
  getAllInterviewFromDB,
  getSingleInterviewFromDB,
  updateInterviewIntoDB,
  createInterviewIntoDB
  
};
