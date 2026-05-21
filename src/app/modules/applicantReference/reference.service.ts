import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Reference } from "./reference.model";
import { TReference } from "./reference.interface";
import { ReferenceSearchableFields } from "./reference.constant";

const getAllReferenceFromDB = async (query: Record<string, unknown>) => {
  const ReferenceQuery = new QueryBuilder(Reference.find(), query)
    .search(ReferenceSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await ReferenceQuery.countTotal();
  const result = await ReferenceQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleReferenceFromDB = async (id: string) => {
  const result = await Reference.findById(id);
  return result;
};

const updateReferenceIntoDB = async (id: string, payload: Partial<TReference>) => {
  const reference = await Reference.findById(id);
  if (!reference) {
    throw new AppError(httpStatus.NOT_FOUND, "Reference not found");
  }

  const result = await Reference.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createReferenceIntoDB = async (payload: Partial<TReference>) => {
  const result = await Reference.create(payload);
  return result;
};




export const ReferenceServices = {
  getAllReferenceFromDB,
  getSingleReferenceFromDB,
  updateReferenceIntoDB,
  createReferenceIntoDB
  
};
