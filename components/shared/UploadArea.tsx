import { useMutation } from "convex/react";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "@/convex/_generated/api";

export function UploadArea() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    await saveStorageId({ storageId: (uploaded[0].response as any).storageId });
  };

  return (
    <UploadDropzone
      uploadUrl={generateUploadUrl}
      fileTypes={{
        "application/pdf": [".pdf"],
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      }}
      onUploadComplete={saveAfterUpload}
      onUploadError={(error: unknown) => {
        // Do something with the error.
        alert(`ERROR! ${error}`);
      }}
    />
  );
}
