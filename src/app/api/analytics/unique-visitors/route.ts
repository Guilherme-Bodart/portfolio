import { createSign } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_ANALYTICS_REPORT_URL = "https://analyticsdata.googleapis.com/v1beta";
const GOOGLE_ANALYTICS_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

function toBase64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createServiceJwt({
  serviceAccountEmail,
  privateKey,
}: {
  serviceAccountEmail: string;
  privateKey: string;
}) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: GOOGLE_ANALYTICS_SCOPE,
    aud: GOOGLE_OAUTH_TOKEN_URL,
    iat: now - 30,
    exp: now + 3600,
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(privateKey);

  return `${unsignedToken}.${toBase64Url(signature)}`;
}

async function getAccessToken(params: {
  serviceAccountEmail: string;
  privateKey: string;
}) {
  const assertion = createServiceJwt(params);
  const tokenResponse = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    throw new Error(`Falha ao obter token OAuth (${tokenResponse.status})`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };

  if (!tokenData.access_token) {
    throw new Error("Token OAuth não retornou access_token.");
  }

  return tokenData.access_token;
}

async function getUniqueVisitors(params: {
  accessToken: string;
  propertyId: string;
  startDate: string;
}) {
  const reportResponse = await fetch(
    `${GOOGLE_ANALYTICS_REPORT_URL}/properties/${params.propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: params.startDate, endDate: "today" }],
        metrics: [{ name: "totalUsers" }],
      }),
      cache: "no-store",
    }
  );

  if (!reportResponse.ok) {
    throw new Error(`Falha no GA4 Data API (${reportResponse.status})`);
  }

  const reportData = (await reportResponse.json()) as {
    rows?: Array<{ metricValues?: Array<{ value?: string }> }>;
  };

  const rawValue = reportData.rows?.[0]?.metricValues?.[0]?.value;
  const totalUsers = Number(rawValue ?? 0);

  if (!Number.isFinite(totalUsers)) {
    return 0;
  }

  return totalUsers;
}

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const serviceAccountEmail = process.env.GA4_SERVICE_ACCOUNT_EMAIL;
  const servicePrivateKey = process.env.GA4_SERVICE_ACCOUNT_PRIVATE_KEY;
  const startDate = process.env.GA4_ANALYTICS_START_DATE ?? "2025-01-01";

  if (!propertyId || !serviceAccountEmail || !servicePrivateKey) {
    return NextResponse.json(
      { enabled: false, totalUsers: null, startDate },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }

  try {
    const privateKey = servicePrivateKey.replace(/\\n/g, "\n");
    const accessToken = await getAccessToken({
      serviceAccountEmail,
      privateKey,
    });
    const totalUsers = await getUniqueVisitors({
      accessToken,
      propertyId,
      startDate,
    });

    return NextResponse.json(
      {
        enabled: true,
        totalUsers,
        startDate,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { enabled: false, totalUsers: null, startDate },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }
}
