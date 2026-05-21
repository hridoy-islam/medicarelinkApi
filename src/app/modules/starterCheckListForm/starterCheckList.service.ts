import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { StarterChecklist } from "./starterCheckList.model";
import { TStarterChecklist } from "./starterCheckList.interface";
import { StarterChecklistSearchableFields } from "./starterCheckList.constant";

const getAllStarterChecklistFromDB = async (query: Record<string, unknown>) => {
  const StarterChecklistQuery = new QueryBuilder(StarterChecklist.find(), query)
    .search(StarterChecklistSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await StarterChecklistQuery.countTotal();
  const result = await StarterChecklistQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleStarterChecklistFromDB = async (id: string) => {
  const result = await StarterChecklist.findById(id);
  return result;
};

const updateStarterChecklistIntoDB = async (id: string, payload: Partial<TStarterChecklist>) => {
  const starterChecklist = await StarterChecklist.findById(id);
  if (!starterChecklist) {
    throw new AppError(httpStatus.NOT_FOUND, "StarterChecklist not found");
  }

  const result = await StarterChecklist.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const createStarterChecklistIntoDB = async (payload: Partial<TStarterChecklist>) => {
  const result = await StarterChecklist.create(payload);
  return result;
};




export const StarterChecklistServices = {
  getAllStarterChecklistFromDB,
  getSingleStarterChecklistFromDB,
  updateStarterChecklistIntoDB,
  createStarterChecklistIntoDB
  
};
