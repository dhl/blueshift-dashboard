import { getCloudflareContext } from "@opennextjs/cloudflare";

const CONTENT_ROOT = "src/app/content";
const BUCKET_PREFIX = "mdx";

/**
 * Loads a content file under src/app/content/. Reads directly from the filesystem while
 * developing locally and falls back to the CONTENT R2 bucket once deployed to Cloudflare.
 */
export async function fetchContentFile(relativePath: string): Promise<string> {
  if (!relativePath) {
    throw new Error("A relative content path is required");
  }

  const normalizedPath = relativePath.replace(/^\/+/, "");

  if (process.env.NODE_ENV !== "production") {
    const [{ readFile }, { join }] = await Promise.all([
      import("node:fs/promises"),
      import("node:path"),
    ]);
    const absolutePath = join(process.cwd(), CONTENT_ROOT, normalizedPath);
    return readFile(absolutePath, "utf-8");
  }

  const { env } = getCloudflareContext();
  const bucket = env?.CONTENT;

  if (!bucket) {
    throw new Error("CONTENT bucket binding is not available in this environment");
  }

  const key = [BUCKET_PREFIX, normalizedPath].join("/");
  const object = await bucket.get(key);

  if (!object) {
    throw new Error(`Content file not found in R2: ${key}`);
  }

  return object.text();
}
