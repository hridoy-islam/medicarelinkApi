import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { BankDetails } from "./bankDetailsFrom.model";
import { TBankDetails } from "./bankDetailsFrom.interface";
import { BankDetailsSearchableFields } from "./bankDetailsFrom.constant";

const getAllBankDetailsFromDB = async (query: Record<string, unknown>) => {
  const BankDetailsQuery = new QueryBuilder(BankDetails.find(), query)
    .search(BankDetailsSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await BankDetailsQuery.countTotal();
  const result = await BankDetailsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleBankDetailsFromDB = async (id: string) => {
  const result = await BankDetails.findById(id);
  return result;
};

const updateBankDetailsIntoDB = async (id: string, payload: Partial<TBankDetails>) => {
  const bankDetails = await BankDetails.findById(id);
  if (!bankDetails) {
    throw new AppError(httpStatus.NOT_FOUND, "BankDetails not found");
  }

  const result = await BankDetails.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createBankDetailsIntoDB = async (payload: Partial<TBankDetails>) => {
  const result = await BankDetails.create(payload);
  return result;
};




export const BankDetailsServices = {
  getAllBankDetailsFromDB,
  getSingleBankDetailsFromDB,
  updateBankDetailsIntoDB,
  createBankDetailsIntoDB
  
};
