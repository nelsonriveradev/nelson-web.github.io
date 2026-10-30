import "server-only";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5_000;

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

/**
 * Small in-memory sliding window limiter. It is per server instance, which is
 * enough to stop accidental spam and naive abuse of the contact form. For
 * multi-instance deployments, back it with a shared store (e.g. Upstash).
 */
export function checkRateLimit(
  key: string,
  { max = MAX_REQUESTS, windowMs = WINDOW_MS }: { max?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= max) {
    const oldest = recent[0] ?? now;
    buckets.set(key, recent);

    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000)),
    };
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [bucketKey, timestamps] of buckets) {
      const last = timestamps[timestamps.length - 1] ?? 0;
      if (now - last > windowMs) buckets.delete(bucketKey);
    }
  }

  return { allowed: true };
}
