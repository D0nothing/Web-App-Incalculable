"use client";

type UploadButtonProps = {
  onFileSelected: (file: File | null) => void;
};

export function UploadButton({ onFileSelected }: UploadButtonProps) {
  return (
    <label className="upload-button">
      Importer un .txt ou .md
      <input
        type="file"
        accept=".txt,.md,text/plain,text/markdown"
        onChange={(event) => onFileSelected(event.target.files?.[0] ?? null)}
      />
    </label>
  );
}
