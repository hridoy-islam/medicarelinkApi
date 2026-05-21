/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export interface TStarterChecklist {
  userId: Types.ObjectId;

  // Personal Details
  firstName: string;
  lastName: string;
  dateOfBirth: string; // or Date if storing as Date
  nationalInsuranceNumber: string;
  startDate: string;   // or Date
  address: string;
  postcode: string;
  country: string;

  // Form Details
  gender: 'male' | 'female';
  employeeStatement: 'A' | 'B' | 'C';
  hasStudentLoan: 'yes' | 'no';
  plan1?: boolean;
  plan2?: boolean;
  plan4?: boolean;
  postgraduateLoan?: boolean;
  declarationSigned: boolean;
}
