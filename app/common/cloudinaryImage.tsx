"use client";

import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function CloudinaryImage(props: any) {
  const [imageReady, setImageReady] = useState(true);
  return (
    <div>
      {imageReady && (
        <CldImage
          {...props}
          effects={[{ blur: "3000" }]}
          style={{ zIndex: "1" }}
          className="absolute"
        />
      )}
      {
        <CldImage
          {...props}
          style={{ zIndex: "0" }}
          onLoadingComplete={() => setImageReady(false)}
        />
      }
    </div>
  );
}
