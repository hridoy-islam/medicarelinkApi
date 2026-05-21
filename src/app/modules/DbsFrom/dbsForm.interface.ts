/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TDbsForm {
  userId: Types.ObjectId;

  // Applicant Info
  name: string;
  jobPost: string;
  dbsDocumentUrl: string;

  // DBS Certificate Info
  disclosureNumber: string;
  dateOfIssue: Date;
  expiryDate: Date;
}