/* eslint-disable no-unused-vars */
import { Schema, model, Model } from "mongoose";
import { TReference } from "./reference.interface";

const ReferenceSchema = new Schema<TReference>(
  {
    referenceType: {
      type: String,
      enum: ["ref1", "ref2", "ref3"],
      required: true,
    },
    applicantId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    applicantName: { type: String, required: true },
    relationship: { type: String, required: true },
    howLongKnown: { type: String, required: true },
    positionApplied: { type: String },
    basedIn: { type: String },
    reasonForLeaving: { type: String },

    // Step 2
    seriousIllness: { type: String },
    drugsDependency: { type: String },
    knowAboutApplicant: { type: Boolean },
    reliable: { type: Boolean },
    punctual: { type: Boolean },
    trustworthy: { type: Boolean },
    approachable: { type: Boolean },
    tactful: { type: Boolean },
    discreet: { type: Boolean },
    selfMotivated: { type: Boolean },
    ableToWorkAlone: { type: Boolean },

    employmentFrom: { type: String },
    employmentTill: { type: String },
    reasonLeaving: { type: String },

    // Step 3
    competency: { type: String },
    commonSense: { type: String },
    relatesWell: { type: String },

    qualityOrganization: { type: String },
    courteousPolite: { type: String },
    willingnessFollowPolicies: { type: String },
    integrityTrust: { type: String },
    attitudeEqualOpportunities: { type: String },
    emotionalControl: { type: String },
    proactiveApproach: { type: String },
    respectTeam: { type: String },
    empathyClients: { type: String },
    attitudesCriticism: { type: String },
    groomingAppearance: { type: String },
    attendancePunctuality: { type: String },

    // Step 4
    cautionsConvictions: { type: String },
    additionalComments: { type: String },
    unsuitableReason: { type: String },
    wouldReemploy: { type: String },
    noReemployReason: { type: String },
    suitabilityOpinion: { type: String },

    refereeName: { type: String },
    refereePosition: { type: String },
    refereeDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Reference: Model<TReference> = model<TReference>(
  "Reference",
  ReferenceSchema
);
