"use client";

import { useContext, useState } from "react";
import { EditContext } from "../context/EditContext";
import { deleteCloudinaryImage, deleteDocument } from "../common/serverfn";
import { useRouter } from "next/navigation";

export default function Delete() {
  const { docId, publicId, uploadMode } = useContext(EditContext);
  const [reallyDelete, setReallyDelete] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const router = useRouter();

  return (
    <>
      {!uploadMode && (
        <>
          {!reallyDelete ? (
            <div className="text-center w-2/3 my-10 hover:bg-red-500 hover:text-white">
              <button
                onClick={() => {
                  setReallyDelete(true);
                }}
              >
                delete
              </button>
            </div>
          ) : (
            <div className="my-10">
              <div className="flex rounded-md shadow-sm w-2/3 mb-2 h-auto">
                <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400">
                  delete key : {docId}
                </span>
                <input
                  type="text"
                  defaultValue={deleteKey}
                  onChange={(e) => {
                    e.preventDefault();
                    setDeleteKey(e.target.value);
                  }}
                  className="py-2 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                ></input>
              </div>
              <div className="text-center w-2/3 hover:bg-red-500 hover:text-white">
                <button
                  onClick={async () => {
                    if (deleteKey == docId) {
                      const result = await deleteCloudinaryImage(publicId);
                      console.log(result);
                      if (result && result.result == "ok") {
                        await deleteDocument(docId);
                      }
                      router.push("/");
                    } else {
                      setReallyDelete(false);
                      setDeleteKey("");
                    }
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
