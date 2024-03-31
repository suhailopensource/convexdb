import React from "react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";

export function Choosefiles() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  return (
    <input
      type="file"
      multiple
      onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files!);
        if (files.length === 0) {
          return;
        }

        const uploaded = await startUpload(files);
        // optionally: do something with the response...
      }}
    />
  );
}
