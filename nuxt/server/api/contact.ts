import { google } from "googleapis";
import { z } from "zod";
import useGetTime from "../utils/use-get-time";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type ContactFormDataWithOptionals = ContactFormData & {
  ip?: string | undefined;
};

const baseUrl = useRuntimeConfig().public.baseUrl;
const { client_email, private_key, spreadsheetIdContacts, discordWebhookUri } =
  useRuntimeConfig();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email,
    private_key: private_key?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const appendToSheet = async ({
  name,
  email,
  message,
  ip,
}: ContactFormDataWithOptionals) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetIdContacts as string,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, message, useGetTime(), ip || "unknown"]],
    },
  });
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
  const isDev = import.meta.dev;
  if (origin !== baseUrl && !isDev) {
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
    const forwarded = event.node.req.headers["x-forwarded-for"];
    const ip =
      (forwarded ? (forwarded as string).split(",")[0]?.trim() : null) ||
      event.node.req.socket.remoteAddress;

    const sheetTask = appendToSheet({ name, email, message, ip });
    const discordTask = fetch(discordWebhookUri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🔔 New Form Submission",
            color: 5763719,
            fields: [
              { name: "Name", value: name, inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Message", value: message },
            ],
            footer: { text: `IP: ${ip} • ${useGetTime()}` },
          },
        ],
      }),
    });

    await Promise.all([sheetTask, discordTask]);

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
