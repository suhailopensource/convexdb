import React, { useState } from "react";
import {
  CldUploadButton,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

const Cloudinaryupload = () => {
  const [resource, setResource] = useState<any>({});
  return (
    <CldUploadWidget
      uploadPreset="jrpt7mva"
      onSuccess={(result, { widget }) => {
        // Type assertion here
        const info = result?.info as CloudinaryUploadWidgetInfo;

        setResource(info);
        console.log(info?.public_id);
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return <button onClick={handleOnClick}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default Cloudinaryupload;
