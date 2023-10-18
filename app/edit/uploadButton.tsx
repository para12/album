"use client";

import { useContext } from "react";
import { EditContext } from "../context/EditContext";
import { useRouter } from "next/navigation";
import {
  addDocument,
  addTag,
  deleteCloudinaryImage,
  getCloudinaryUploadSignature,
  updateDocument,
} from "../common/serverfn";
import { convertTag, dateFormatTest } from "@/app/common/util";
import { useSession } from "next-auth/react";
import { MainContext } from "../context/MainContext";

export default function UploadButton() {
  const {
    docId,
    uploadMode,
    tag,
    text,
    photoCapturedAt,
    setPhotoCapturedAt,
    imageFile,
    photoUploaded,
    publicId,
    imageChanged,
    oldTag,
  } = useContext(EditContext);
  const { setLoadingBg } = useContext(MainContext);

  const session = useSession();
  const router = useRouter();

  async function cloudinaryUpload() {
    const { signature, timestamp } = await getCloudinaryUploadSignature();
    const formData = new FormData();
    if (imageFile) formData.append("file", imageFile);
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
    );
    formData.append("signature", signature);
    formData.append("timestamp", timestamp as any);

    const data = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((r) => r.json())
      .catch((error) => {
        console.log(error);
      });
    return data;
  }

  async function onClickUpload(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    const data = await cloudinaryUpload();

    const add_info = {
      photo_url: (data as any).secure_url,
      public_id: (data as any).public_id,
      photo_captured_at: photoCapturedAt,
      photo_uploaded_at: new Date().toLocaleDateString(),
      tag: convertTag(tag),
      text,
      author: session.data?.user?.email,
    };

    const docId = await addDocument(add_info);
    await addTag(convertTag(oldTag), convertTag(tag));
    router.push(`/content/${docId}`);
  }

  async function onClickUpdate(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    const data = imageChanged ? await cloudinaryUpload() : undefined;
    const update_info = imageChanged
      ? {
          photo_url: (data as any).secure_url,
          public_id: (data as any).public_id,
          tag: convertTag(tag),
          text,
          photo_captured_at: photoCapturedAt,
          edited_at: new Date().toLocaleDateString(),
        }
      : {
          tag: convertTag(tag),
          text,
          photo_captured_at: photoCapturedAt,
          edited_at: new Date().toLocaleDateString(),
        };

    await updateDocument(docId, update_info);
    await addTag(convertTag(oldTag), convertTag(tag));
    if (imageChanged) {
      await deleteCloudinaryImage(publicId);
    }

    router.push(`/content/${docId}`);
  }

  return (
    <div>
      {uploadMode ? (
        photoUploaded && (
          <div
            className="font-medium flex justify-start hover:text-gray-400 hover:fill-current"
            aria-current="page"
          >
            <span
              className="flex"
              onClick={(e) => {
                if (dateFormatTest(photoCapturedAt)) {
                  setLoadingBg(true);
                  onClickUpload(e);
                } else {
                  setPhotoCapturedAt("재입력");
                }
              }}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                className="rotate-180"
              >
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
              upload{" "}
            </span>
          </div>
        )
      ) : (
        <button
          className="font-medium flex justify-start hover:text-gray-400 hover:fill-current"
          aria-current="page"
        >
          <span
            className="flex"
            onClick={(e) => {
              if (dateFormatTest(photoCapturedAt)) {
                setLoadingBg(true);
                onClickUpdate(e);
              } else {
                setPhotoCapturedAt("재입력");
              }
            }}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="rotate-180"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
            update{" "}
          </span>
        </button>
      )}
    </div>
  );
}
