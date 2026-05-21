import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { EcertForm } from "./ecertFrom.model";
import { TEcertForm } from "./ecertFrom.interface";
import { EcertFormSearchableFields } from "./ecertFrom.constant";

const getAllEcertFormFromDB = async (query: Record<string, unknown>) => {
  const EcertFormQuery = new QueryBuilder(EcertForm.find().populate('ecertId').populate({
      path: "userId",
      select: "title firstName initial lastName email phone ",
    }), query)
    .search(EcertFormSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await EcertFormQuery.countTotal();
  const result = await EcertFormQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleEcertFormFromDB = async (id: string) => {
  const result = await EcertForm.findById(id);
  return result;
};

const updateEcertFormIntoDB = async (id: string, payload: Partial<TEcertForm>) => {
  const ecertForm = await EcertForm.findById(id);
  if (!ecertForm) {
    throw new AppError(httpStatus.NOT_FOUND, "EcertForm not found");
  }

  const result = await EcertForm.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createEcertFormIntoDB = async (payload: Partial<TEcertForm>) => {
  const result = await EcertForm.create(payload);
  return result;
};


const deleteEcertFormIntoDB = async (id: string) => {
  const ecertForm = await EcertForm.findById(id);
  if (!ecertForm) {
    throw new AppError(httpStatus.NOT_FOUND, "EcertForm not found");
  }

  const result = await EcertForm.findByIdAndDelete(id);

  return result;
};





export const EcertFormServices = {
  getAllEcertFormFromDB,
  getSingleEcertFormFromDB,
  updateEcertFormIntoDB,
  createEcertFormIntoDB,
  deleteEcertFormIntoDB
  
};
