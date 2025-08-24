import nodemailer from "nodemailer";
import { z } from "zod";

// TODO: Need to use diffrenct email service if it is slow

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// with optionls is better name
type ContactFormDataWithSuccess = ContactFormData & {
  success?: boolean;
  ip: string | undefined;
};

interface EmailTemplates {
  confirmation: (data: ContactFormData) => string;
  notification: (data: ContactFormDataWithSuccess) => string;
}

type FallbackType = "user" | "admin";

const { gmail, phone, baseUrl } = useRuntimeConfig().public;
const { clientId, clientSecret, refreshToken } = useRuntimeConfig();
const from = gmail;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: from,
    clientId,
    clientSecret,
    refreshToken,
  },
});

const generateFallbackText = (
  data: ContactFormDataWithSuccess,
  type: FallbackType
): string => {
  const { name, email, message, success } = data;

  if (type === "user") {
    return `Hi ${name},

We have received your message:

"${message}"

We will get back to you as soon as possible.

Thank you,
Your Company Name`;
  }

  if (type === "admin") {
    return `New contact form submission:

Name: ${name}
Email: ${email}
Message: "${message}"
Status: ${success ? "Sent successfully" : "Failed"}`;
  }

  return "";
};

const emailTemplates: EmailTemplates = {
  confirmation: (data: ContactFormData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
    </head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
        <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">We'll get back to you soon</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hi <strong>${data.name}</strong>,</p>

        <p style="font-size: 16px; margin-bottom: 20px;">Thank you for reaching out to us! We have successfully received your message and will respond within 24 hours.</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="color: #667eea; margin-top: 0; font-size: 18px;">Your Message Summary:</h3>
          <p style="margin-bottom: 10px;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin-bottom: 0;"><strong>Message:</strong></p>
          <p style="margin-top: 5px; margin-bottom: 0; padding: 10px; background: white; border-radius: 4px; font-style: italic;">${data.message}</p>
        </div>

        <p style="font-size: 16px; margin-bottom: 20px;">If you need immediate assistance, feel free to reply to this email or contact us directly.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/${phone}" target="_blank"
         style="background: #667eea; color: white; padding: 15px 30px; border-radius: 5px; display: inline-block; text-decoration: none; font-weight: bold; transition: background 0.3s ease;">
        Chat with us on WhatsApp
      </a>
    </div>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

        <p style="font-size: 14px; color: #666; text-align: center; margin: 0;">
          Best regards,<br>
           <a href="mailto:${from}" style="color: #667eea; text-decoration: none; font-size: 17px;">Sabeer Bikba</a>
        </p>

        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
          This is an automated confirmation of your request.
        </p>
      </div>
    </body>
    </html>
  `,

  notification: (data: ContactFormDataWithSuccess) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Contact!</h1>
        <p style="color: #fff3cd; margin: 10px 0 0 0; font-size: 16px;">Someone just reached out via your website</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #667eea; margin-top: 0; font-size: 22px;">Contact Details</h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold; width: 30%;">Name:</td>
            <td style="padding: 12px; background: white; border: 1px solid #e9ecef;">${
              data.name
            }</td>
          </tr>
          <tr>
            <td style="padding: 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold;">Email:</td>
            <td style="padding: 12px; background: white; border: 1px solid #e9ecef;"><a href="mailto:${
              data.email
            }" style="color: #667eea; text-decoration: none;">${
    data.email
  }</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold;">Sucess:</td>
            <td style="padding: 12px; background: white; border: 1px solid #e9ecef; font-family: monospace;color: ${
              Boolean(data.success) ? "green" : "red"
            }">${Boolean(data.success)}</td>
          </tr>
          <tr>
            <td style="padding: 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold;">Date:</td>
            <td style="padding: 12px; background: white; border: 1px solid #e9ecef;">${new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 12px; background: #f8f9fa; border: 1px solid #e9ecef; font-weight: bold;">IP:</td>
            <td style="padding: 12px; background: white; border: 1px solid #e9ecef;">${
              data.ip
            }</td>
          </tr>
        </table>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
          <h3 style="color: #667eea; margin-top: 0; font-size: 18px;">Message:</h3>
          <p style="margin: 0; white-space: pre-wrap; font-size: 16px; line-height: 1.5;">${
            data.message
          }</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${data.email}" 
             style="background: #667eea; color: white; padding: 15px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reply to ${data.name}
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">

        <p style="font-size: 14px; color: #666; text-align: center; margin: 0;">
          This email was automatically generated from your website contact form.
        </p>
      </div>
    </body>
    </html>
  `,
};

const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(70, "Name cannot exceed 70 characters"),
    email: z.email("Please enter a valid email address"),
    message: z
      .string()
      .trim()
      .min(20, "Message must be at least 20 characters long")
      .max(900, "Message cannot exceed 900 characters"),
  })
  .strict();

export default defineEventHandler(async (event) => {
  const origin = getRequestHeader(event, "origin") || "unknown";
  if (origin !== baseUrl && !import.meta.dev) {
    console.log("origin, baseUrl", origin, baseUrl);
    setResponseStatus(event, 403);
    return {
      error: true,
      statusCode: 403,
      message: "Forbidden",
    };
  }

  if (event.method !== "POST") {
    setResponseStatus(event, 405);
    return {
      error: true,
      statusCode: 405,
      message: "Method Not Allowed",
    };
  }

  const contentType = getHeader(event, "content-type") || "";
  if (!contentType.includes("application/json")) {
    setResponseStatus(event, 400);
    return {
      error: true,
      statusCode: 400,
      message: "Invalid content type. Expected application/json.",
    };
  }

  const body = await readBody<ContactFormData>(event);
  const { name, email, message } = body;
  const stringifiedMessage = String(message);

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    setResponseStatus(event, 400);
    return {
      error: true,
      statusCode: 400,
      message: "Invalid inputs.",
      errors: parsed.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }

  try {
    const info = {
      name,
      email,
      message: stringifiedMessage,
    };

    const mail = await transporter.sendMail({
      from,
      to: email,
      subject: name + ", we received your message!",
      text: generateFallbackText(info, "user"),
      html: emailTemplates.confirmation(info),
    });

    const forwarded = event.node.req.headers["x-forwarded-for"];
    const ip =
      (forwarded ? (forwarded as string).split(",")[0].trim() : null) ||
      event.node.req.socket.remoteAddress;

    await transporter.sendMail({
      from,
      to: from,
      subject: `Message from ${name} via contact form`,
      text: generateFallbackText(info, "admin"),
      html: emailTemplates.notification({
        ...info,
        success: mail.rejected.length === 0,
        ip,
      }),
    });

    setResponseStatus(event, 200);
    return {
      error: false,
      statusCode: 200,
      message: "Message sent successfully!",
    };
  } catch (err: any) {
    console.error("Email send error:", err);
    setResponseStatus(event, 502);
    return {
      error: true,
      statusCode: 502,
      message:
        "Something went wrong while sending your message. Please try again later.",
    };
  }
});
