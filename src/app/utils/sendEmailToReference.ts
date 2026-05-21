import nodemailer from "nodemailer";
import ejs from "ejs";
import config from "../config";

export const sendEmailToReference = async (
  to: string,
  template: string,
  subject: string,
  applicantName: string,
  referenceName: string,
  applicationLink?: string,
  jobRole?:string
) => {
  const transporter = nodemailer.createTransport({
    host: "mail.everycareromford.co.uk",
    port: 465,
    secure: true,
    auth: {
      user: "admin@everycareromford.co.uk",
      pass: "St4rting0ver!!!",
    },

  });

  try {
    const html = await ejs.renderFile(
      __dirname + "/../static/email_template/" + template + ".ejs",
      {
        
        applicantName,
        referenceName,
        applicationLink,
        jobRole
       
      }
    );
    const mailOptions = {
      from:'"Everycare" <admin@everycareromford.co.uk>',
      to,
      subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
