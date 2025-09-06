import { google } from "googleapis";
import useGetTime from "../utils/use-get-time";

type DeployHookResponse = {
  job: {
    id: string;
    state: "PENDING" | "QUEUED" | "BUILDING" | "READY" | "ERROR" | string;
    createdAt: number;
  };
};

const {
  client_email,
  private_key,
  spreadsheetIdRedeploy,
  cronSecret,
  deployHookUrl,
} = useRuntimeConfig();


const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email,
    private_key: private_key?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const logDeploymentToSheet = async ({
  jobId,
  jobCreatedAt,
  status,
  statusText,
}: {
  jobId: string;
  jobCreatedAt: number;
  status: number;
  statusText: string;
}) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetIdRedeploy as string,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[jobId, jobCreatedAt, useGetTime(), status, statusText]],
    },
  });
};

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    setResponseStatus(event, 405);
    return {
      error: true,
      statusCode: 405,
    };
  }

  const authHeader = getHeader(event, "authorization");
  const isDev = import.meta.dev;
  if (authHeader !== `Bearer ${cronSecret}` && !isDev) {
    setResponseStatus(event, 401);
    return {
      error: true,
      statusCode: 401,
    };
  }

  try {
    // Docs: https://vercel.com/docs/deploy-hooks
    const response = await fetch(deployHookUrl as string, { method: "POST" });
    const data: DeployHookResponse = await response.json().catch(() => null);

    if (!response.ok) {
      await logDeploymentToSheet({
        jobId: data?.job?.id ?? "N/A",
        jobCreatedAt: data?.job?.createdAt ?? Date.now(),
        status: response.status,
        statusText: response.statusText,
      });

      setResponseStatus(event, response.status);
      return {
        error: true,
        statusCode: response.status,
        message: `Deploy hook failed: ${response.statusText}`,
      };
    }

    await logDeploymentToSheet({
      jobId: data.job.id,
      jobCreatedAt: data.job.createdAt,
      status: response.status,
      statusText: response.statusText,
    });

    setResponseStatus(event, 200);
    return {
      error: false,
      statusCode: 200,
    };
  } catch (err) {
    console.error("Cron API error:", err);
    setResponseStatus(event, 500);
    return {
      error: true,
      statusCode: 500,
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong while triggering deploy hook",
    };
  }
});
