"use client";

import { CldImage } from "next-cloudinary";

export default function CloudinaryImage(props: any) {
  return (
    <div>
      <CldImage {...props} />
    </div>
  );
}
