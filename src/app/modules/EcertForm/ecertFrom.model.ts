/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TEcertForm } from "./ecertFrom.interface";

const EcertFormSchema = new Schema<TEcertForm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ecertId: { type: Schema.Types.ObjectId, ref: "Ecert", required: true },
    document: { type: String} 
  },
  {
    timestamps: true,
  }
);

export const EcertForm: Model<TEcertForm> = model<TEcertForm>(
  "EcertForm",
  EcertFormSchema
);
