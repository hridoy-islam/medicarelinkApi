/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TBankDetails {
  userId: Types.ObjectId;

  // Bank details
  bankName: string;
  bankAddress: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  buildingSocietyRollNumber?: string;

  name: string;
  jobPost: string;
  houseNumber: string;
  address: string;
  postcode: string;
}

