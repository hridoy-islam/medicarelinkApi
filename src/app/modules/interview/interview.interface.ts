/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";


interface AssessmentEntry {
  score: number;       // out of 10
  comment: string;     // justification text
}


export interface TInterview {
  candidateId: Types.ObjectId;      
  jobId: Types.ObjectId;               
  interviewDate: Date;       
  interviewerName: string;
  assessments: Record<string, AssessmentEntry>; 
  decision: 'reject' | 'appointed' | 'second-choice';
  decisionReason: string;
  candidateAdvised: 'yes' | 'no';
}
