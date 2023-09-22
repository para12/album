"use client";

import { useContext } from "react";
import { EditContext } from "../context/EditContext";

export default function TextareaAndTag() {
  const { uploadMode, tag, setTag, text, setText, photoUploaded } =
    useContext(EditContext);

  return (
    <>
      <div className="flex rounded-md shadow-sm w-2/3 h-96 my-4">
        <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
          Text
        </span>
        <textarea
          disabled={!photoUploaded && uploadMode}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-96 py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
      </div>
      <div className="flex rounded-md shadow-sm w-2/3 h-auto my-4">
        <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
          Tag
        </span>
        <input
          disabled={!photoUploaded && uploadMode}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        ></input>
      </div>
    </>
  );
}
