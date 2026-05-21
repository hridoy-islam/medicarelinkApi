/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { TStarterChecklist } from './starterCheckList.interface';

const StarterChecklistSchema = new Schema<TStarterChecklist>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Personal Details
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true }, // Or type: Date
    nationalInsuranceNumber: { type: String, required: true },
    startDate: { type: String, required: true }, // Or type: Date
    address: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
    // Form Details
    gender: { type: String, enum: ['male', 'female'], required: true },
    employeeStatement: { type: String, enum: ['A', 'B', 'C'], required: true },
    hasStudentLoan: { type: String, enum: ['yes', 'no'], required: true },

    // Payment Plan Options
    plan1: { type: Boolean, default: false },
    plan2: { type: Boolean, default: false },
    plan4: { type: Boolean, default: false },
    postgraduateLoan: { type: Boolean, default: false },

    declarationSigned: { type: Boolean, required: true }
  },
  { timestamps: true }
);

export const StarterChecklist = model<TStarterChecklist>(
  'StarterChecklist',
  StarterChecklistSchema
);
