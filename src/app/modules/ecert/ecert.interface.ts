/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TEcert {
  title: string;
  status?: 'active' | 'block';
}
