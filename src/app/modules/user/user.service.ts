import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { sendEmailToReference } from "../../utils/sendEmailToReference";
import { JobApplication } from "../jobApplications/jobApplication.model";
import crypto from "crypto";
import { sendModuleEmail } from "../../utils/sendModulesEmail";
import Logs from "../logs/logs.model";

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string, selectFields: string = "") => {
  let query = User.findById(id);

  if (selectFields) {
    query = query.select(selectFields);
  }

  const result = await query;
  return result;
};

const scheduleRecurringEmails = (email: string, name: string) => {
  const intervalMinutes = 5;

  const emailSequence = [
    {
      id: 1,
      to: email,
      subject: "Welcome! Your Profile is Complete",
      template: "welcome_template",
    },
    {
      id: 2,
      to: email,
      subject: "Here are some tips for your application",
      template: "tips_template",
    },
    {
      id: 3,
      to: email,
      subject: "Meet our team",
      template: "team_intro_template",
    },
    {
      id: 4,
      to: email,
      subject: "Important Documentation Requirements",
      template: "docs_template",
    },
    {
      id: 5,
      to: email,
      subject: "Final Reminder regarding your application",
      template: "final_check_template",
    },
  ];

  emailSequence.forEach((mailConfig, index) => {
    const delayTime = (index + 1) * intervalMinutes * 60 * 1000;

    setTimeout(async () => {
      try {
        await sendModuleEmail(
          email,
          mailConfig.template,
          mailConfig.subject,
          name
        );
        console.log(`✅ Sequence Email #${mailConfig.id} sent to ${email}`);
      } catch (error) {
        console.error(
          `❌ Failed to send sequence email #${mailConfig.id}`,
          error
        );
      }
    }, delayTime);
  });
};

export const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // ✅ Update user data
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });


  const completionFieldsMap: Record<string, string> = {
    dbsDone: "DBS Check completed.",
    medicalDone: "Medical Questionnaire completed.",
    ecertDone: "E-Certificates uploaded.",
    bankDetailsDone: "Bank Details submitted.",
    checkListDone: "Starter Checklist completed.",
  };

  for (const [field, logMessage] of Object.entries(completionFieldsMap)) {
    if ((payload as any)[field] === true) {
      try {
        await Logs.create({
          userId: id,
          action: logMessage,
        });
      } catch (logError) {
        console.error(`❌ Failed to create log for ${field}:`, logError);
      }
    }
  }

  if (payload.isCompleted) {
    try {
      await Logs.create({
        userId: id,
        action: `Applicant form completed.`,
      });
    } catch (logError) {
      console.error(
        `❌ Failed to create log for profile completion:`,
        logError
      );
    }
  }

  // ✅ Trigger reference emails when profile completed
  if (payload.referenceMailSent) {
    const jobApplication = await JobApplication.findOne({
      applicantId: id,
    }).populate("jobId", "jobTitle");

    if (jobApplication) {
      const jobRole = (jobApplication.jobId as any)?.jobTitle || "";
      const applicantName = result?.name || "";
      const applicantEmail = result?.email || "";

      // Define reference data
      const referenceData = [
        {
          refFlag: result?.ref1Submit,
          refEmail: result?.professionalReferee1?.email?.trim().toLowerCase(),
          refName: result?.professionalReferee1?.name,
          refPosition: result?.professionalReferee1?.position,
          refType: "ref1",
          refRelation: result?.professionalReferee1?.relationship,
        },
        {
          refFlag: result?.ref2Submit,
          refEmail: result?.professionalReferee2?.email?.trim().toLowerCase(),
          refName: result?.professionalReferee2?.name,
          refPosition: result?.professionalReferee2?.position,
          refType: "ref2",
          refRelation: result?.professionalReferee2?.relationship,
        },
        {
          refFlag: result?.ref3Submit,
          refEmail: result?.personalReferee?.email?.trim().toLowerCase(),
          refName: result?.personalReferee?.name,
          refPosition: result?.personalReferee?.position,
          refType: "ref3",
          refRelation: result?.personalReferee?.relationship,
        },
      ];

      // Loop through references and send emails
      for (const ref of referenceData) {
        if (ref?.refEmail && ref?.refFlag === false) {
          try {
            const basePath =
              ref.refType === "ref3" ? "personal" : "professional";
            const randomToken = crypto.randomBytes(24).toString("hex");
            const formatForUrl = (str = "") =>
              encodeURIComponent(str.trim().replace(/\s+/g, "-"));

            const applicationLink = `https://career.everycareromford.co.uk/${basePath}?${formatForUrl(
              applicantName
            )}&${formatForUrl(applicantEmail)}&${formatForUrl(
              ref.refName
            )}&${formatForUrl(ref.refRelation)}&${formatForUrl(
              ref.refPosition
            )}&${formatForUrl(jobRole)}&${formatForUrl(
              ref.refType
            )}&${randomToken}`;

            await sendEmailToReference(
              ref.refEmail,
              "reference-letter",
              `Reference Request for ${applicantName}`,
              applicantName,
              ref.refName || "",
              applicationLink,
              jobRole
            );

            // console.log(`✅ Reference email sent to ${ref.refEmail}`);

            try {
              await Logs.create({
                userId: id,
                action: `Reference Request Sent: ${ref.refType} to ${ref.refName} (${ref.refEmail}).`,
              });
            } catch (logError) {
              console.error(
                `❌ Failed to create log for reference email sent:`,
                logError
              );
            }
          } catch (error) {
            console.error(
              `❌ Failed to send reference email to ${ref.refEmail}:`,
              error
            );
          }
        }
      }

      if (applicantEmail) {
        scheduleRecurringEmails(applicantEmail, applicantName);
      }
    }
  }

  return result;
};

export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
};
