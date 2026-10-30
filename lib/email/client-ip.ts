import "server-only";

import { headers } from "next/headers";

/**
 * Best-effort client IP for rate limiting. In production this should be
 * behind a proxy (Vercel, Cloudflare, nginx) that overwrites the header.
 */
export async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();

  const forwarded = requestHeaders.get("x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();

  return (
    firstForwarded ||
    requestHeaders.get("cf-connecting-ip")?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    "unknown"
  );
}
