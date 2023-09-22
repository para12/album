"use client";

import { useContext, useState } from "react";
import { EditContext } from "../context/EditContext";
import ExifReader from "exifreader";
import CloudinaryImage from "../common/cloudinaryImage";
import Image from "next/image";

export default function ImageUpload() {
  const {
    photoCapturedAt,
    setPhotoCapturedAt,
    photoUrl,
    photoUploaded,
    setPhotoUploaded,
    setImageFile,
    publicId,
    setImageChanged,
    uploadMode,
  } = useContext(EditContext);

  const [imageSrc, setImageSrc] = useState<any>(undefined);

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    reader.onload = async function (onLoadEvent) {
      if (onLoadEvent.target && typeof onLoadEvent.target.result == "string") {
        const result = onLoadEvent.target.result;
        setImageSrc(result);
        const imageMeta = await ExifReader.load(result);
        const capturedAtOriginal =
          imageMeta?.DateTimeOriginal?.value.toString();
        if (capturedAtOriginal) {
          const capuredAt = capturedAtOriginal.substring(0, 10);
          const regex = RegExp(
            /^\d{4}:(0[1-9]|1[012]):(0[1-9]|[12][0-9]|3[01])$/
          );
          setPhotoCapturedAt(regex.test(capuredAt) ? capuredAt : "1900:01:01");
        } else {
          setPhotoCapturedAt("1900:01:01");
        }
        setImageChanged(true);
      }
    };

    const target = changeEvent.target;
    if (target.files) {
      const file = target.files[0];
      reader.readAsDataURL(file);
      setImageFile(file);
      setPhotoUploaded(true);
    }
  }

  return (
    <div>
      <div className="my-4">
        <input
          onChange={handleOnChange}
          type="file"
          name="file"
          id="small-file-input"
          className="block border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
        />
      </div>

      {(publicId || photoUrl || imageSrc) && (
        <>
          {imageSrc && (
            <Image src={imageSrc} width={800} height={800} alt="new" />
          )}
          {!imageSrc && publicId && (
            <CloudinaryImage
              src={publicId}
              width={800}
              height={800}
              alt="new"
            />
          )}

          <div className="flex rounded-md shadow-sm w-2/3 h-auto my-4">
            <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
              Date
            </span>
            <input
              type="text"
              defaultValue={photoCapturedAt}
              onBlur={(e) => {
                e.preventDefault();
                if (photoCapturedAt) setPhotoCapturedAt(e.target.value);
              }}
              className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            ></input>
          </div>
        </>
      )}
    </div>
  );
}
