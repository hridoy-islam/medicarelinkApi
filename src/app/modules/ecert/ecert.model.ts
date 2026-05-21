/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TEcert } from "./ecert.interface";


const EcertSchema = new Schema<TEcert>(
  {
    title: { type: String, required: true },
   
    status: {
      type: String,
      enum: ['active', 'block'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export const Ecert: Model<TEcert> = model<TEcert>("Ecert", EcertSchema);
