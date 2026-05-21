import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.router";

import { NotificationsRoutes } from "../modules/notification/notification.route";
import { UploadDocumentRoutes } from "../modules/documents/documents.route";
import { JobApplicationRoutes } from "../modules/jobApplications/jobApplication.route";
import { InterviewRoutes } from "../modules/interview/interview.route";
import { JobRoutes } from "../modules/job/job.route";
import { ReferenceRoutes } from "../modules/applicantReference/reference.route";
import { EmailDraftRoutes } from "../modules/email-drafts/email-drafts.route";
import { SignatureRoutes } from "../modules/signature/signature.route";
import { EmailRoutes } from "../modules/email/email.route";
import { EcertRoutes } from "../modules/ecert/ecert.route";
import { EcertFormRoutes } from "../modules/EcertForm/ecertFrom.route";
import { DbsFormRoutes } from "../modules/DbsFrom/dbsForm.route";
import { BankDetailsRoutes } from "../modules/bankDetailsForm/bankDetailsFrom.route";
import { MedicalQuestionRoutes } from "../modules/postMedicalQuestion/medicalQuestion.route";
import { StarterChecklistRoutes } from "../modules/starterCheckListForm/starterCheckList.route";
import { LogsRoutes } from "../modules/logs/logs.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },

  {
    path: "/notifications",
    route: NotificationsRoutes,
  },
  {
    path: "/documents",
    route: UploadDocumentRoutes,
  },
  {
    path: "/application-job",
    route: JobApplicationRoutes,
  },

  {
    path: "/jobs",
    route: JobRoutes,
  },

  {
    path: "/interview",
    route: InterviewRoutes,
  },
  {
    path: "/reference",
    route: ReferenceRoutes,
  },
  {
    path: "/email-drafts",
    route: EmailDraftRoutes,
  },
  {
    path: "/signature",
    route: SignatureRoutes,
  },
  {
    path: "/email",
    route: EmailRoutes,
  },
  {
    path: "/ecerts",
    route: EcertRoutes,
  },
  {
    path: "/ecert-form",
    route: EcertFormRoutes,
  },
  {
    path: "/dbs-form",
    route: DbsFormRoutes,
  },
  {
    path: "/bank-details",
    route: BankDetailsRoutes,
  },
  {
    path: "/medical-form",
    route: MedicalQuestionRoutes,
  },
  {
    path: "/starter-checklist-form",
    route: StarterChecklistRoutes,
  },
  {
    path: "/logs",
    route: LogsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
