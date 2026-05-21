import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Ecert } from "./ecert.model";
import { TEcert } from "./ecert.interface";
import { EcertSearchableFields } from "./ecert.constant";

const getAllEcertFromDB = async (query: Record<string, unknown>) => {
  const EcertQuery = new QueryBuilder(Ecert.find(), query)
    .search(EcertSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await EcertQuery.countTotal();
  const result = await EcertQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleEcertFromDB = async (id: string) => {
  const result = await Ecert.findById(id);
  return result;
};

const updateEcertIntoDB = async (id: string, payload: Partial<TEcert>) => {
  const ecert = await Ecert.findById(id);
  if (!ecert) {
    throw new AppError(httpStatus.NOT_FOUND, "Ecert not found");
  }

  const result = await Ecert.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createEcertIntoDB = async (payload: Partial<TEcert>) => {
  const result = await Ecert.create(payload);
  return result;
};


const deleteEcertIntoDB = async (id: string) => {
  const ecert = await Ecert.findById(id);
  if (!ecert) {
    throw new AppError(httpStatus.NOT_FOUND, "Ecert not found");
  }

  const result = await Ecert.findByIdAndDelete(id);

  return result;
};




export const EcertServices = {
  getAllEcertFromDB,
  getSingleEcertFromDB,
  updateEcertIntoDB,
  createEcertIntoDB,
  deleteEcertIntoDB
  
};
