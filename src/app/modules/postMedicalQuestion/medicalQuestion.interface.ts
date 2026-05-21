/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TMedicalQuestion {
  userId:Types.ObjectId;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date; // Note: In MongoDB, Date objects are used
  positionApplied: string;
  postcode: string;
  sex: 'male' | 'female';

  // --- Occupational History ---
  workRestrictions: boolean;
  workRestrictionsDetails?: string;

  // --- Past Medical History ---
  undueFatigue: boolean;
  undueFatigueDetails?: string;
  bronchitis: boolean;
  bronchitisDetails?: string;
  breathlessness: boolean;
  breathlessnessDetails?: string;
  allergies: boolean;
  allergiesDetails?: string;
  pneumonia: boolean;
  pneumoniaDetails?: string;
  hayFever: boolean;
  hayFeverDetails?: string;
  shortnessOfBreath: boolean;
  shortnessOfBreathDetails?: string; // persistent cough/wheeze
  jaundice: boolean;
  jaundiceDetails?: string;
  stomachProblem: boolean; // vomiting/diarrhoea
  stomachProblemDetails?: string;
  stomachUlcer: boolean;
  stomachUlcerDetails?: string;
  hernias: boolean;
  herniasDetails?: string;
  bowelProblem: boolean;
  bowelProblemDetails?: string;
  diabetes: boolean;
  diabetesDetails?: string;
  nervousDisorder: boolean; // mental illness/anxiety/etc
  nervousDisorderDetails?: string;
  dizziness: boolean; // fainting
  dizzinessDetails?: string;
  earProblems: boolean;
  earProblemsDetails?: string;
  hearingDefect: boolean;
  hearingDefectDetails?: string;
  epilepsy: boolean; // fits/blackouts
  epilepsyDetails?: string;
  eyeProblems: boolean;
  eyeProblemsDetails?: string;
  ppeAllergy: boolean;
  ppeAllergyDetails?: string;

  // Second Column / Continuation
  rheumaticFever: boolean;
  rheumaticFeverDetails?: string;
  highBP: boolean;
  highBPDetails?: string;
  lowBP: boolean;
  lowBPDetails?: string;
  palpitations: boolean;
  palpitationsDetails?: string;
  heartAttack: boolean;
  heartAttackDetails?: string;
  angina: boolean;
  anginaDetails?: string;
  asthma: boolean;
  asthmaDetails?: string;
  chronicLungProblems: boolean;
  chronicLungProblemsDetails?: string;
  stroke: boolean; // or TIA
  strokeDetails?: string;
  heartMurmur: boolean;
  heartMurmurDetails?: string;
  backProblems: boolean;
  backProblemsDetails?: string;
  jointProblems: boolean;
  jointProblemsDetails?: string;
  swollenLegs: boolean;
  swollenLegsDetails?: string;
  varicoseVeins: boolean;
  varicoseVeinsDetails?: string;
  rheumatism: boolean;
  rheumatismDetails?: string;
  migraine: boolean;
  migraineDetails?: string;
  drugReaction: boolean;
  drugReactionDetails?: string;
  visionCorrection: boolean; // glasses/contacts
  visionCorrectionDetails?: string;
  skinConditions: boolean;
  skinConditionsDetails?: string;
  alcoholHealth: boolean;
  alcoholHealthDetails?: string;

  // Serious Illness (5+ days off)
  seriousIllnessHistory: boolean;
  seriousIllnessHistoryDetails?: string;

  // Specific Questions
  recentIllHealth: boolean;
  recentIllHealthDetails?: string;
  attendingClinic: boolean;
  attendingClinicDetails?: string;
  chickenPox: boolean;
  chickenPoxDetails?: string;
  communicableDisease: boolean;
  communicableDiseaseDetails?: string;

  // Inoculations
  inocDiphtheria: boolean;
  inocDiphtheriaDetails?: string;
  inocHepB: boolean;
  inocHepBDetails?: string;
  inocTB: boolean;
  inocTBDetails?: string;
  inocRubella: boolean;
  inocRubellaDetails?: string;
  inocVaricella: boolean;
  inocVaricellaDetails?: string;
  inocPolio: boolean;
  inocPolioDetails?: string;
  inocTetanus: boolean;
  inocTetanusDetails?: string;
  hivTest: boolean;
  hivTestDetails?: string;
  inocOther: boolean;
  inocOtherDetails?: string;

  // Additional
  daysSickness: string; // Stored as string as per Zod schema 'e.g. 0, 5 days'

  // Declarations
  declTrueAccount: boolean;
  declDataProcessing: boolean;
  declVaccination: boolean;
  declTermination: boolean;
}
