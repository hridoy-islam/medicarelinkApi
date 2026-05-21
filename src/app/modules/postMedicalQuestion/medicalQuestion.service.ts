import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { MedicalQuestion } from "./medicalQuestion.model";
import { TMedicalQuestion } from "./medicalQuestion.interface";
import { MedicalQuestionSearchableFields } from "./medicalQuestion.constant";

const getAllMedicalQuestionFromDB = async (query: Record<string, unknown>) => {
  const MedicalQuestionQuery = new QueryBuilder(MedicalQuestion.find(), query)
    .search(MedicalQuestionSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await MedicalQuestionQuery.countTotal();
  const result = await MedicalQuestionQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleMedicalQuestionFromDB = async (id: string) => {
  const result = await MedicalQuestion.findById(id);
  return result;
};

const updateMedicalQuestionIntoDB = async (id: string, payload: Partial<TMedicalQuestion>) => {
  const medicalQuestion = await MedicalQuestion.findById(id);
  if (!medicalQuestion) {
    throw new AppError(httpStatus.NOT_FOUND, "MedicalQuestion not found");
  }

  const result = await MedicalQuestion.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createMedicalQuestionIntoDB = async (payload: Partial<TMedicalQuestion>) => {
  const result = await MedicalQuestion.create(payload);
  return result;
};




export const MedicalQuestionServices = {
  getAllMedicalQuestionFromDB,
  getSingleMedicalQuestionFromDB,
  updateMedicalQuestionIntoDB,
  createMedicalQuestionIntoDB
  
};
