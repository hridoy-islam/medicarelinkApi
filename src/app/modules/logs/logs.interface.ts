import { Types } from "mongoose";


export interface TLogs {
  userId: Types.ObjectId;
  action: string;
 
}
