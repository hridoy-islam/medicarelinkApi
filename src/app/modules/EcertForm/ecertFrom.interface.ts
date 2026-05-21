/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TEcertForm {
  userId: Types.ObjectId;
  ecertId: Types.ObjectId;
  document: string;
}
