/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TReference {

  referenceType: string,
  applicantId: Types.ObjectId,
  // === Step 1: Shared / Overlapping Fields ===
  applicantName: string;
  relationship: string;
  howLongKnown: string;
  positionApplied?: string;
  reasonForLeaving?: string;

  // From Character Reference
  basedIn?: string;


  // === Step 2: Health vs Employment ===
  // Character Reference: Health & Personal Characteristics
  seriousIllness?: boolean;
  drugsDependency?: boolean;
  knowAboutApplicant?: boolean;
  reliable?: boolean;
  punctual?: boolean;
  trustworthy?: boolean;
  approachable?: boolean;
  tactful?: boolean;
  discreet?: boolean;
  selfMotivated?: boolean;
  ableToWorkAlone?: boolean;

  // Employment Reference: Employment Details
  employmentFrom?: string;
  employmentTill?: string;
  reasonLeaving?: string;

  // === Step 3: Competency vs Performance ===
  // Character Reference
  competency?: string;
  commonSense?: string;
  relatesWell?: string;

  // Employment Reference: Performance Ratings (using actual keys as field names, all as string)
  qualityOrganization?: string;
  courteousPolite?: string;
  willingnessFollowPolicies?: string;
  integrityTrust?: string;
  attitudeEqualOpportunities?: string;
  emotionalControl?: string;
  proactiveApproach?: string;
  respectTeam?: string;
  empathyClients?: string;
  attitudesCriticism?: string;
  groomingAppearance?: string;
  attendancePunctuality?: string;

  // === Step 4: Final Assessment ===
  // Character Reference
  cautionsConvictions?: boolean;
  additionalComments?: string;

  // Employment Reference
  unsuitableReason?: string;
  wouldReemploy?: string; // e.g., "yes" or "no" — kept as string per your request
  noReemployReason?: string;
  suitabilityOpinion: string; // required in both forms

  // Shared Final Fields
  refereeName: string;
  refereePosition: string;
  refereeDate: Date;
}