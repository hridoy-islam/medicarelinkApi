import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

import AppError from "../../errors/AppError";

import { EmailSearchableFields } from "./email.constant";
import { TEmail } from "./email.interface";
import Email from "./email.model";
import { User } from "../user/user.model";

import moment from "moment";

import Signature from "../signature/signature.model";
import { JobApplication } from "../jobApplications/jobApplication.model";
import { sendEmailManual } from "../../utils/sendEmailManual";
import Logs from "../logs/logs.model";



const createEmailIntoDB = async (payload: any) => {
  try {
    const {
      emailDraft,
      userId,
      issuedBy,
      subject: emailSubject,
      body: emailBody,
      applicationId,
      jobOfferMailSent,
      interviewMailSent,
      referenceMailSent
    } = payload;

    // Find user
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Fetch course name if applicationId is provided
    let applicationStatus = "";
    let applicationDate = "";
    let applicationTitle = "";

    if (userId) {
      const application = await JobApplication.findById(applicationId).populate('jobId')

      applicationStatus = application?.status || "";
      applicationTitle = (application as any)?.jobId?.jobTitle || "";
      applicationDate = (application as any)?.createdAt
        ? moment((application as any)?.createdAt).format("DD MMM, YYYY")
        : "";
    }

    // Enhanced helper to replace all variables including dynamic ones
    const replaceVariables = async (text: string): Promise<string> => {
      let replacedText = text;

      // 1. Replace basic variables
      replacedText = replacedText
        .replace(/\[admin\]/g, "Everycare Romford")
        .replace(/\[adminEmail\]/g, "admin@everycareromford.co.uk")
        .replace(/\[applicationStatus\]/g, applicationStatus)
        .replace(/\[applicationDate\]/g, applicationDate)
        .replace(/\[applicationTitle\]/g, applicationTitle)
        .replace(/\[todayDate\]/g, moment().format("DD MMM, YYYY"))
        .replace(/\[name\]/g, foundUser.name || "")
        .replace(/\[title\]/g, foundUser.title || "")
        .replace(/\[firstName\]/g, foundUser.firstName || "")
        .replace(/\[lastName\]/g, foundUser.lastName || "")
        .replace(/\[phone\]/g, foundUser.phone || "")
        .replace(
          /\[dateOfBirth\]/g,
          foundUser.dateOfBirth
            ? moment(foundUser.dateOfBirth).format("DD MMM, YYYY")
            : ""
        )
        .replace(/\[email\]/g, foundUser.email || "")
        .replace(/\[countryOfBirth\]/g, foundUser.countryOfBirth || "")
        .replace(/\[nationality\]/g, foundUser.nationality || "")
        .replace(/\[countryOfResidence\]/g, foundUser.countryOfResidence || "")
        .replace(/\[postalAddressLine1\]/g, foundUser.postalAddressLine1 || "")
        .replace(/\[postalAddressLine2\]/g, foundUser.postalAddressLine2 || "")
        .replace(/\[postalCity\]/g, foundUser.postalCity || "")
        .replace(/\[postalCountry\]/g, foundUser.postalCountry || "")
        .replace(/\[postalPostCode\]/g, foundUser.postalPostCode || "")
        .replace(/\[emergencyAddress\]/g, foundUser.emergencyAddress || "")
        .replace(
          /\[emergencyContactNumber\]/g,
          foundUser.emergencyContactNumber || ""
        )
        .replace(/\[emergencyEmail\]/g, foundUser.emergencyEmail || "")
        .replace(/\[emergencyFullName\]/g, foundUser.emergencyFullName || "")
        .replace(
          /\[emergencyRelationship\]/g,
          foundUser.emergencyRelationship || ""
        );


      // 2. Handle [signature id="1"] tags → Replace with <img> tag
      const signatureRegex = /\[signature\s+id=["'](\d+)["']\]/g;
      const signatureMatches = [...replacedText.matchAll(signatureRegex)];

      const signaturePromises = signatureMatches.map(async (match) => {
        const signatureId = match[1];
        const placeholder = match[0];

        try {
          const signature = await Signature.findOne({ signatureId: signatureId });
          const url = signature?.documentUrl;

          if (url) {
            // ✅ Replace with <img> tag for rendering in email
            return {
              placeholder,
              replacement: `<img src="${url}" alt="Signature" style="max-width: 120px; margin-top: 20px;" />`,
            };
          }
          return { placeholder, replacement: "" };
        } catch (error) {
          console.error(`Error fetching signature ${signatureId}:`, error);
          return { placeholder, replacement: "" };
        }
      });

      // 4. Wait for all async replacements and apply them
      const allPromises = [...signaturePromises];

      if (allPromises.length > 0) {
        const replacements = await Promise.all(allPromises);

        // Apply all replacements to the text
        replacements.forEach(({ placeholder, replacement }) => {
          replacedText = replacedText.replace(new RegExp(escapeRegExp(placeholder), 'g'), replacement ?? '');
        });
      }

      return replacedText;
    };

    // Helper function to escape special regex characters
    const escapeRegExp = (string: string): string => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Replace variables in subject and body
    const processedSubject = await replaceVariables(emailSubject);
    const processedBody = await replaceVariables(emailBody);

    // Save email with processed body (plain text with variables replaced)
    const result = await Email.create({
      ...payload,
      subject: processedSubject,
      body: processedBody, // Already replaced
    });

    // ✅ Convert newlines to <br> and render HTML (important!)
    const htmlBody = processedBody.replace(/\n/g, "<br/>");
    await sendEmailManual(
      foundUser.email,
      "custom_template",
      processedSubject,
      htmlBody // This will now include <img> tags
    );

    // Update status to 'sent'
    const updatedEmail = await Email.findByIdAndUpdate(
      result._id,
      { status: "sent" },
      { new: true, runValidators: true }
    );


    let logAction = "";
 
    
    // Determine the log action and type based on flags
    if (jobOfferMailSent === true) {
      logAction = `Job Offer Mail Sent to ${foundUser.name} for the role: ${applicationTitle}.`;
     
    } else if (interviewMailSent === true) {
      logAction = `Interview Invitation Mail Sent to ${foundUser.name} for the role: ${applicationTitle}.`;
      
    }else {
      logAction = `Email sent to ${foundUser.name}. Subject: "${processedSubject}"`;
 
    }

    try {
      await Logs.create({
        userId: userId,
        action: `${logAction}`,
      });
      // console.log(`✅ Logged email action: ${logAction}`);
    } catch (logError) {
      console.error(`❌ Failed to create log for email sending:`, logError);
    }

    // ==========================================================
    // ✅ NEW LOGIC: Update User flags based on Payload
    // ==========================================================
    
    // Check if we need to update the User document
    const userUpdates: Record<string, boolean> = {};

    if (jobOfferMailSent === true) {
      userUpdates.jobOfferMailSent = true;
    }

    if (interviewMailSent === true) {
      userUpdates.interviewMailSent = true;
    }

    // Only make the DB call if there is something to update
    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(
        userId, 
        userUpdates,
        { new: true }
      );
    }
    // ==========================================================

    return updatedEmail;
  } catch (error: any) {
    console.error("Error in createEmailIntoDB:", error);

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create or send email"
    );
  }
};


const getAllEmailFromDB = async (query: Record<string, unknown>) => {
  const EmailQuery = new QueryBuilder(
    Email.find().populate("issuedBy", "name email"),
    query
  )
    .search(EmailSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await EmailQuery.countTotal();
  const result = await EmailQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleEmailFromDB = async (id: string) => {
  const result = await Email.findById(id);
  return result;
};

const updateEmailIntoDB = async (id: string, payload: Partial<TEmail>) => {
  const email = await Email.findById(id);

  if (!email) {
    throw new AppError(httpStatus.NOT_FOUND, "Email not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await Email.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const EmailServices = {
  getAllEmailFromDB,
  getSingleEmailFromDB,
  updateEmailIntoDB,
  createEmailIntoDB,
};
