/* eslint-disable no-unused-vars */
import { Schema, model, Types } from 'mongoose';
import { TMedicalQuestion } from './medicalQuestion.interface';

const medicalQuestionSchema = new Schema<TMedicalQuestion>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    firstName: { type: String},
    lastName: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    positionApplied: { type: String },
    postcode: { type: String },
    sex: { type: String, enum: ['male', 'female'] },

    // --- Occupational History ---
    workRestrictions: { type: Boolean, default: false },
    workRestrictionsDetails: { type: String, default: "" },

    // --- Past Medical History ---
    undueFatigue: { type: Boolean, default: false },
    undueFatigueDetails: { type: String, default: "" },

    bronchitis: { type: Boolean, default: false },
    bronchitisDetails: { type: String, default: "" },

    breathlessness: { type: Boolean, default: false },
    breathlessnessDetails: { type: String, default: "" },

    allergies: { type: Boolean, default: false },
    allergiesDetails: { type: String, default: "" },

    pneumonia: { type: Boolean, default: false },
    pneumoniaDetails: { type: String, default: "" },

    hayFever: { type: Boolean, default: false },
    hayFeverDetails: { type: String, default: "" },

    shortnessOfBreath: { type: Boolean, default: false },
    shortnessOfBreathDetails: { type: String, default: "" },

    jaundice: { type: Boolean, default: false },
    jaundiceDetails: { type: String, default: "" },

    stomachProblem: { type: Boolean, default: false },
    stomachProblemDetails: { type: String, default: "" },

    stomachUlcer: { type: Boolean, default: false },
    stomachUlcerDetails: { type: String, default: "" },

    hernias: { type: Boolean, default: false },
    herniasDetails: { type: String, default: "" },

    bowelProblem: { type: Boolean, default: false },
    bowelProblemDetails: { type: String, default: "" },

    diabetes: { type: Boolean, default: false },
    diabetesDetails: { type: String, default: "" },

    nervousDisorder: { type: Boolean, default: false },
    nervousDisorderDetails: { type: String, default: "" },

    dizziness: { type: Boolean, default: false },
    dizzinessDetails: { type: String, default: "" },

    earProblems: { type: Boolean, default: false },
    earProblemsDetails: { type: String, default: "" },

    hearingDefect: { type: Boolean, default: false },
    hearingDefectDetails: { type: String, default: "" },

    epilepsy: { type: Boolean, default: false },
    epilepsyDetails: { type: String, default: "" },

    eyeProblems: { type: Boolean, default: false },
    eyeProblemsDetails: { type: String, default: "" },

    ppeAllergy: { type: Boolean, default: false },
    ppeAllergyDetails: { type: String, default: "" },

    // --- Second Column ---
    rheumaticFever: { type: Boolean, default: false },
    rheumaticFeverDetails: { type: String, default: "" },

    highBP: { type: Boolean, default: false },
    highBPDetails: { type: String, default: "" },

    lowBP: { type: Boolean, default: false },
    lowBPDetails: { type: String, default: "" },

    palpitations: { type: Boolean, default: false },
    palpitationsDetails: { type: String, default: "" },

    heartAttack: { type: Boolean, default: false },
    heartAttackDetails: { type: String, default: "" },

    angina: { type: Boolean, default: false },
    anginaDetails: { type: String, default: "" },

    asthma: { type: Boolean, default: false },
    asthmaDetails: { type: String, default: "" },

    chronicLungProblems: { type: Boolean, default: false },
    chronicLungProblemsDetails: { type: String, default: "" },

    stroke: { type: Boolean, default: false },
    strokeDetails: { type: String, default: "" },

    heartMurmur: { type: Boolean, default: false },
    heartMurmurDetails: { type: String, default: "" },

    backProblems: { type: Boolean, default: false },
    backProblemsDetails: { type: String, default: "" },

    jointProblems: { type: Boolean, default: false },
    jointProblemsDetails: { type: String, default: "" },

    swollenLegs: { type: Boolean, default: false },
    swollenLegsDetails: { type: String, default: "" },

    varicoseVeins: { type: Boolean, default: false },
    varicoseVeinsDetails: { type: String, default: "" },

    rheumatism: { type: Boolean, default: false },
    rheumatismDetails: { type: String, default: "" },

    migraine: { type: Boolean, default: false },
    migraineDetails: { type: String, default: "" },

    drugReaction: { type: Boolean, default: false },
    drugReactionDetails: { type: String, default: "" },

    visionCorrection: { type: Boolean, default: false },
    visionCorrectionDetails: { type: String, default: "" },

    skinConditions: { type: Boolean, default: false },
    skinConditionsDetails: { type: String, default: "" },

    alcoholHealth: { type: Boolean, default: false },
    alcoholHealthDetails: { type: String, default: "" },

    // --- Serious Illness ---
    seriousIllnessHistory: { type: Boolean, default: false },
    seriousIllnessHistoryDetails: { type: String, default: "" },

    // --- Specific Questions ---
    recentIllHealth: { type: Boolean, default: false },
    recentIllHealthDetails: { type: String, default: "" },

    attendingClinic: { type: Boolean, default: false },
    attendingClinicDetails: { type: String, default: "" },

    chickenPox: { type: Boolean, default: false },
    chickenPoxDetails: { type: String, default: "" },

    communicableDisease: { type: Boolean, default: false },
    communicableDiseaseDetails: { type: String, default: "" },

    // --- Inoculations ---
    inocDiphtheria: { type: Boolean, default: false },
    inocDiphtheriaDetails: { type: String, default: "" },

    inocHepB: { type: Boolean, default: false },
    inocHepBDetails: { type: String, default: "" },

    inocTB: { type: Boolean, default: false },
    inocTBDetails: { type: String, default: "" },

    inocRubella: { type: Boolean, default: false },
    inocRubellaDetails: { type: String, default: "" },

    inocVaricella: { type: Boolean, default: false },
    inocVaricellaDetails: { type: String, default: "" },

    inocPolio: { type: Boolean, default: false },
    inocPolioDetails: { type: String, default: "" },

    inocTetanus: { type: Boolean, default: false },
    inocTetanusDetails: { type: String, default: "" },

    hivTest: { type: Boolean, default: false },
    hivTestDetails: { type: String, default: "" },

    inocOther: { type: Boolean, default: false },
    inocOtherDetails: { type: String, default: "" },

    daysSickness: { type: String, default: '0' },

    // Declarations
    declTrueAccount: { type: Boolean, default: false },
    declDataProcessing: { type: Boolean, default: false },
    declVaccination: { type: Boolean, default: false },
    declTermination: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const MedicalQuestion = model<TMedicalQuestion>(
  'MedicalQuestion',
  medicalQuestionSchema
);
