import crypto from "crypto";

export const uuidRegex = /[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}/;
export const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
export const tweetUrlRegex = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/status\/([0-9]+)/

export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}
