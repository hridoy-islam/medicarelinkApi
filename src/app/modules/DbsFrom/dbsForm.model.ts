/* eslint-disable no-unused-vars */
import { Schema, model, Types } from 'mongoose';
import { TDbsForm } from './dbsForm.interface';

const DbsFormSchema = new Schema<TDbsForm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Applicant Info
    name: { type: String },
    jobPost: { type: String },

    // DBS Certificate Details
    disclosureNumber: { type: String },
    dbsDocumentUrl: { type: String },
    dateOfIssue: { type: Date },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

export const DbsForm = model<TDbsForm>('DbsForm', DbsFormSchema);
