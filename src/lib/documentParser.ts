export function parseUploadedDocument(fileName: string, content: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "txt" || extension === "md") {
    return content.trim();
  }

  throw new Error("Only .txt and .md documents are supported for now.");
}
