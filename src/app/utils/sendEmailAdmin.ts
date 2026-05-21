import nodemailer from "nodemailer";
import ejs from "ejs";
import config from "../config";

export const sendEmailAdmin = async (
  to: string,
  template: string,
  subject: string,
  name: string,
  otp?: string,
  title?: string,
  applicantEmail?: string,
  phone?: string,
  countryOfResidence?: string,
  dob?:string,
  availableFromDate?:string
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
        otp: otp,
        name: name,
        title: title,
        phone: phone,
        email:applicantEmail,
        countryOfResidence: countryOfResidence,
        dob: dob,
        availableFromDate: availableFromDate,
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
