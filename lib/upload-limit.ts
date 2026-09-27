// Uploads go through a server action; Vercel rejects request bodies over ~4.5MB.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_LABEL = "4MB";
export const TOO_LARGE_MESSAGE = `File is larger than ${MAX_UPLOAD_LABEL}.`;

// Clears the picked file when it's too big; returns true so the caller can warn.
export function clearIfTooLarge(input: HTMLInputElement) {
  const file = input.files?.[0];
  if (!file || file.size <= MAX_UPLOAD_BYTES) return false;
  input.value = "";
  return true;
}
