/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { TBankDetails } from './bankDetailsFrom.interface';

const BankDetailsSchema = new Schema<TBankDetails>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Applicant Info
    name: { type: String, required: true },
    jobPost: { type: String },
    houseNumber: { type: String },
    address: { type: String },
    postcode: { type: String },

    // Bank Details
    bankName: { type: String },
    bankAddress: { type: String },
    accountName: { type: String },
    sortCode: { type: String },
    accountNumber: { type: String },
    buildingSocietyRollNumber: { type: String }, // optional

    
  },
  { timestamps: true }
);

export const BankDetails = model<TBankDetails>('BankDetails', BankDetailsSchema);
