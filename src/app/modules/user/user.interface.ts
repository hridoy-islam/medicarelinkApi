/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";
import e from "express";

export interface BrowserInfo {
  name?: string;
  version?: string;
}

export interface OSInfo {
  name?: string;
  version?: string;
}

export interface DeviceInfo {
  model?: string;
  type?: string;
  vendor?: string;
}

export interface CPUInfo {
  architecture?: string;
}

export interface UserAgentInfo {
  browser?: BrowserInfo;
  os?: OSInfo;
  device?: DeviceInfo;
  cpu?: CPUInfo;
  ipAddress: string;
  macAddress: string;
  timestamp?: Date;
}

export interface PersonalDetails {
  title: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: string;
  dateOfBirth: Date;
  nationality: string;
  ethnicity: string;
  customEthnicity?: string;
  countryOfBirth: string;
  maritalStatus: string;
}

export interface AddressData {
  residentialAddressLine1: string;
  residentialAddressLine2?: string;
  residentialCity: string;
  residentialPostCode: string;
  residentialCountry: string;

  sameAsResidential: boolean;
  postalAddressLine1?: string;
  postalAddressLine2?: string;
  postalCity?: string;
  postalPostCode?: string;
  postalCountry?: string;
}

export interface ContactData {
  contactNumber: string;
  email: string;
  confirmEmail: string;
  preferredContactMethod: string;

  emergencyContactNumber: string;
  emergencyEmail: string;
  emergencyFullName: string;
  emergencyRelationship: string;
}

export interface ComplianceData {
  startDateInUK?: Date;
  niNumber?: string;
  status: string;
  ltrCode?: string;
  disability: string;
  disabilityDetails?: string;
  benefits: string;
  criminalConviction: string;
  convictionDetails?: string;
  studentFinance: string;
}

export interface DocumentsData {
  hasPassport?: boolean;
  passportNumber?: string;
  passportExpiry?: string;
  idDocument?: any;

  hasCertificates?: boolean;
  certificatesDetails?: string;
  qualificationCertificates?: any;

  cvResume?: any;

  hasProofOfAddress?: boolean;
  proofOfAddressType?: string;
  proofOfAddressDate?: string;
  proofOfAddress?: any;

  otherDocuments?: any;
  otherDocumentsDescription?: string;
}

export interface EmploymentData {
  isEmployed: string;
  currentEmployment?: {
    employer?: string;
    jobTitle?: string;
    startDate?: string;
    employmentType?: string;
    responsibilities?: string;
    supervisor?: string;
    contactPermission?: string;
  };
  previousEmployments?: {
    employer: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    reasonForLeaving: string;
    responsibilities: string;
    contactPermission: string;
  }[];
  hasEmploymentGaps: string;
  employmentGapsExplanation?: string;
  declaration: true;
}

export interface TermsData {
  acceptTerms: boolean;
  acceptDataProcessing: boolean;
}

export interface EducationEntry {
  institution: string;
  studyType: string;
  qualification: string;
  awardDate: Date;
  certificate?: string;
  transcript?: string;
}

interface CourseDetail {
  course: string;
  intake: string;
}

export interface emergencyContactData {
  emergencyContactNumber: string;
  emergencyEmail: string;
  emergencyFullName: string;
  emergencyRelationship: string;
}

export interface EnglishQualification {
  englishTestType?: string;
  englishTestScore?: string;
  englishTestDate?: Date;
  englishCertificate?: string;
}

export interface Referee {
  name: string;
  position: string;
  relationship: string;
  organisation: string;
  address: string;
  tel: string;
  fax?: string;
  email: string;
}

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "student" | "applicant";
  status: "block" | "active";
  isDeleted: boolean;
  authorized: boolean;
  address?: string;
  image?: string;
  phone?: string;
  googleUid?: string;
  otp?: string;
  refreshToken?: string;
  otpExpiry?: Date;
  isUsed: boolean;
  isValided: boolean;
  isCompleted: boolean;
  userAgentInfo: UserAgentInfo[];

  // -----------------------
  // Personal Info
  // -----------------------
  title?: string;
  firstName?: string;
  lastName?: string;
  otherName?: string;
  initial?: string;
  dateOfBirth?: Date;
  nationality?: string;
  countryOfResidence?: string;
  countryOfBirth?: string;
  shareCode?: string;
  nationalInsuranceNumber?: string;

  // -----------------------
  // Postal Address
  // -----------------------
  postalAddressLine1?: string;
  postalAddressLine2?: string;
  postalCity?: string;
  postalPostCode?: string;
  postalCountry?: string;

  // -----------------------
  // Emergency Contact
  // -----------------------
  emergencyContactNumber?: string;
  emergencyEmail?: string;
  emergencyFullName?: string;
  emergencyRelationship?: string;
  emergencyAddress?: string;

  // -----------------------
  // Bank Details
  // -----------------------
  houseNumberOrName?: string;
  postCode?: string;
  jobRole?: string;
  otherJobRole?: string;
  accountNumber?: string;
  sortCode?: string;
  bankName?: string;
  branchName?: string;
  buildingSocietyRollNo?: string;

  // -----------------------
  // Application & Career
  // -----------------------
  availableFromDate: Date;
  source: string;
  referralEmployee?: string;

  availability: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
  };

  isStudent: boolean;
  isUnderStatePensionAge: boolean;
  isOver18: boolean;
  isSubjectToImmigrationControl: boolean;
  canWorkInUK: boolean;

  competentInOtherLanguage: boolean;
  otherLanguages?: string[];

  drivingLicense: boolean;
  licenseNumber?: string;

  carOwner: boolean;
  travelAreas: string;

  solelyForEverycare: boolean;
  otherEmployers?: string;

  professionalBody: boolean;
  professionalBodyDetails?: string;

  // -----------------------
  // Employment
  // -----------------------
  isEmployed: string;
  currentEmployment?: {
    employer?: string;
    jobTitle?: string;
    startDate?: string; // using string because of API serialization
    employmentType?: string;
    responsibilities?: string;
    supervisor?: string;
    contactPermission?: string;
  };
  hasPreviousEmployment?: string;
  previousEmployments?: {
    employer?: string;
    jobTitle?: string;
    startDate?: string;
    endDate?: string;
    reasonForLeaving?: string;
    responsibilities?: string;
    hasEmploymentGaps?: string;
    employmentGapsExplanation?: string;
    contactPermission?: string;
  }[];
  hasEmploymentGaps?: string;
  employmentGapsExplanation?: string;

  // -----------------------
  // Education
  // -----------------------
  educationData: {
    institution: string;
    qualification: string;
    awardDate: Date;
    grade?: string;
    certificate?: string;
  }[];

  // -----------------------
  // Training
  // -----------------------
  trainingData?: {
    trainingName: string;
    awardingBody: string;
    completionDate: Date | null;
    certificate?: string;
  }[];
  // -----------------------
  // Ethnicity
  // -----------------------
  ethnicityGroup?: string;
  ethnicityValue?: string;
  ethnicityOther?: string;

  // -----------------------
  // Life Skills & Experience
  // -----------------------
  hasDisability: boolean;
  disabilityDetails: string;
  needsReasonableAdjustment: boolean;
  reasonableAdjustmentDetails: string;
  // -----------------------
  // Life Skills & Experience
  // -----------------------
  lifeSkillsAndInterests?: string;
  relevantExperience?: string;

  // -----------------------
  // References
  // -----------------------
  professionalReferee1?: Referee;
  professionalReferee2?: Referee;
  personalReferee?: Referee;

  // -----------------------
  // Documents
  // -----------------------
  cvResume?: string;
  proofOfAddress1?: string;
  proofOfAddress2?: string;
  idDocuments?: string[];
  utilityBills?: string[];
  bankStatement?: string[];
  proofOfNI?: string[];
  immigrationDocument?: string[];
  proofOfAddress?: string[];
  passport?: string[];
  workExperience?: string[];
  personalStatement?: string[];

  // -----------------------
  // Health & Medical
  // -----------------------

  sex: string;
  advisedMedicalWorkRestriction?: boolean;
  advisedMedicalWorkRestrictionComment?: string;
  undueFatigue?: boolean;
  undueFatigueDetails?: string;
  bronchitis?: boolean;
  bronchitisDetails?: string;
  breathlessness?: boolean;
  breathlessnessDetails?: string;
  allergies?: boolean;
  allergiesDetails?: string;
  pneumonia?: boolean;
  pneumoniaDetails?: string;
  hayFever?: boolean;
  hayFeverDetails?: string;
  shortnessOfBreath?: boolean;
  shortnessOfBreathDetails?: string;
  jundice?: boolean;
  jundiceDetails?: string;
  stomachProblems?: boolean;
  stomachProblemsDetails?: string;
  stomachUlcer?: boolean;
  stomachUlcerDetails?: string;
  hernias?: boolean;
  herniasDetails?: string;
  bowelProblem?: boolean;
  bowelProblemDetails?: string;
  diabetesMellitus?: boolean;
  diabetesMellitusDetails?: string;
  nervousDisorder?: boolean;
  nervousDisorderDetails?: string;
  dizziness?: boolean;
  dizzinessDetails?: string;
  earProblems?: boolean;
  earProblemsDetails?: string;
  hearingDefect?: boolean;
  hearingDefectDetails?: string;
  epilepsy?: boolean;
  epilepsyDetails?: string;
  eyeProblems?: boolean;
  eyeProblemsDetails?: string;
  ppeAllergy?: boolean;
  ppeAllergyDetails?: string;
  rheumaticFever?: boolean;
  rheumaticFeverDetails?: string;
  highBloodPressure?: boolean;
  highBloodPressureDetails?: string;
  lowBloodPressure?: boolean;
  lowBloodPressureDetails?: string;
  palpitations?: boolean;
  palpitationsDetails?: string;
  heartAttack?: boolean;
  heartAttackDetails?: string;
  angina?: boolean;
  anginaDetails?: string;
  asthma?: boolean;
  asthmaDetails?: string;
  chronicLungProblems?: boolean;
  chronicLungProblemsDetails?: string;
  stroke?: boolean;
  strokeDetails?: string;
  heartMurmur?: boolean;
  heartMurmurDetails?: string;
  backProblems?: boolean;
  backProblemsDetails?: string;
  jointProblems?: boolean;
  jointProblemsDetails?: string;
  swollenLegs?: boolean;
  swollenLegsDetails?: string;
  varicoseVeins?: boolean;
  varicoseVeinsDetails?: string;
  rheumatism?: boolean;
  rheumatismDetails?: string;
  migraine?: boolean;
  migraineDetails?: string;
  drugReaction?: boolean;
  drugReactionDetails?: string;
  visionCorrection?: boolean;
  visionCorrectionDetails?: string;
  skinConditions?: boolean;
  skinConditionsDetails?: string;
  alcoholHealthProblems?: boolean;
  alcoholHealthProblemsDetails?: string;
  seriousIllnessDetails?: string;
  recentIllHealth?: boolean;
  recentIllHealthComment?: string;
  attendingClinic?: boolean;
  attendingClinicComment?: string;
  hadChickenPox?: boolean;
  hadChickenPoxComment?: string;
  otherCommunicableDisease?: boolean;
  otherCommunicableDiseaseComment?: string;

  // -----------------------
  // Inoculations / Vaccinations
  // -----------------------
  inocDiphtheria?: boolean;
  inocDiphtheriaComment?: string;
  inocHepatitisB?: boolean;
  inocHepatitisBComment?: string;
  inocTuberculosis?: boolean;
  inocTuberculosisComment?: string;
  inocRubella?: boolean;
  inocRubellaComment?: string;
  inocVaricella?: boolean;
  inocVaricellaComment?: string;
  inocPolio?: boolean;
  inocPolioComment?: string;
  inocTetanus?: boolean;
  inocTetanusComment?: string;
  testedHIV?: boolean;
  testedHIVComment?: string;
  inocOther?: string;
  inocOtherComment?: string;

  daysSickLastYear?: string;

  // -----------------------
  // Consent & Declarations
  // -----------------------
  declarationCorrectUpload?: boolean;
  declarationContactReferee?: boolean;
  authorizeReferees?: boolean;
  disciplinaryInvestigation?: boolean;
  disciplinaryInvestigationDetails?: string;
  abuseInvestigation?: boolean;
  abuseInvestigationDetails?: string;
  roaDeclaration?: boolean;
  roaDeclarationDetails?: string;
  appliedBefore?: boolean;
  termsAccepted?: boolean;
  dataProcessingAccepted?: boolean;
  consentMedicalDeclaration?: boolean;
  // consentDataProtection?: boolean;
  consentVaccination?: boolean;
  consentTerminationClause?: boolean;

  ref1Submit?: boolean;
  ref2Submit?: boolean;
  ref3Submit?: boolean;

  dbsDone: boolean;
  medicalDone: boolean;
  ecertDone: boolean;
  bankDetailsDone: boolean;
  checkListDone: boolean;


  jobOfferMailSent: boolean;
  interviewMailSent: boolean;
  referenceMailSent: boolean;
  postEmploymentUnlock: boolean;
  dbsUnlock: boolean;
  ecertUnlock: boolean;
  bankDetailsUnlock: boolean;
  startDateUnlock: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
