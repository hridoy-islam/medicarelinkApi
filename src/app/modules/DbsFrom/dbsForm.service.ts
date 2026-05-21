import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { DbsForm } from "./dbsForm.model";
import { TDbsForm } from "./dbsForm.interface";
import { DbsFormSearchableFields } from "./dbsForm.constant";

const getAllDbsFormFromDB = async (query: Record<string, unknown>) => {
  const DbsFormQuery = new QueryBuilder(DbsForm.find(), query)
    .search(DbsFormSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await DbsFormQuery.countTotal();
  const result = await DbsFormQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleDbsFormFromDB = async (id: string) => {
  const result = await DbsForm.findById(id);
  return result;
};

const updateDbsFormIntoDB = async (id: string, payload: Partial<TDbsForm>) => {
  const dbsForm = await DbsForm.findById(id);
  if (!dbsForm) {
    throw new AppError(httpStatus.NOT_FOUND, "DbsForm not found");
  }

  const result = await DbsForm.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createDbsFormIntoDB = async (payload: Partial<TDbsForm>) => {
  const result = await DbsForm.create(payload);
  return result;
};




export const DbsFormServices = {
  getAllDbsFormFromDB,
  getSingleDbsFormFromDB,
  updateDbsFormIntoDB,
  createDbsFormIntoDB
  
};
