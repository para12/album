"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { MainContext } from "./MainContext";
import { addSharpToTag } from "../common/util";

export const EditContext = createContext<any>(undefined);

export default function EditProvider({ children }: any) {
  const { contentState: item } = useContext(MainContext);
  const uploadMode = useSearchParams().get("mode") == "upload";
  const [photoUrl, setPhotoUrl] = useState(
    uploadMode ? undefined : item.photoUrl
  );
  const [photoCapturedAt, setPhotoCapturedAt] = useState(
    uploadMode ? undefined : item.photo_captured_at
  );
  const [text, setText] = useState(uploadMode ? "" : item.text);
  const [tag, setTag] = useState(uploadMode ? "" : addSharpToTag(item.tag));
  const [docId, setDocId] = useState(uploadMode ? "" : item.doc_id);
  const [publicId, setPublicId] = useState(uploadMode ? "" : item.public_id);
  const [imageFile, setImageFile] = useState(undefined);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  return (
    <EditContext.Provider
      value={{
        uploadMode,
        photoUrl,
        setPhotoUrl,
        imageFile,
        setImageFile,
        photoCapturedAt,
        setPhotoCapturedAt,
        photoUploaded,
        setPhotoUploaded,
        text,
        setText,
        tag,
        setTag,
        docId,
        setDocId,
        publicId,
        setPublicId,
        imageChanged,
        setImageChanged,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}
