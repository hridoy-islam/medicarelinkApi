// src/models/interview.model.ts

import { Schema, model, Model } from "mongoose";
import { TInterview } from "./interview.interface";

const InterviewSchema = new Schema<TInterview>(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "JobApplication", required: true },
    interviewDate: { type: Date, required: true },
    interviewerName: { type: String, required: true },

    assessments: {
      type: Map,
      of: {
        score: { type: Number, },
        comment: { type: String, default: "" },
      },
      default: {},
    },

    decision: {
      type: String,
      enum: ["reject", "appointed", "second-choice"],
      required: true,
    },
    decisionReason: { type: String, default: "" },
    candidateAdvised: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Interview: Model<TInterview> = model<TInterview>("Interview", InterviewSchema);