"use client";
import CloudinaryImage from "@/app/common/cloudinaryImage";
import { addSharpToTag } from "@/app/common/util";
import Comments from "./comments";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MainContext } from "@/app/context/MainContext";
import { readSingleDoc } from "@/app/common/serverfn";
import { useSession } from "next-auth/react";

export default function Content({ docId }: { docId: string }) {
  const session = useSession();
  const [item, setItem] = useState<null | any>(null);
  const { setContentState, setLoadingBg } = useContext(MainContext);

  useEffect(() => {
    async function readDoc(id: any) {
      const i = await readSingleDoc(id);
      setItem(i);
    }
    readDoc(docId);
    setLoadingBg(false);
  }, [docId, setLoadingBg]);

  const imageSize =
    item?.photo_orientation && item.photo_orientation == "vertical"
      ? 700
      : 2500;
  return (
    <div className="mx-3   md:mx-auto md:mb-10">
      {item && (
        <div>
          <div className="flex justify-center">
            <CloudinaryImage
              src={item.public_id}
              alt={addSharpToTag(item.tag)}
              width={imageSize}
              height={imageSize}
              sizes="100vw"
            />
          </div>
          <div className="w-full my-3 text-right">
            {item.photo_captured_at} {addSharpToTag(item.tag)}
          </div>
          <div className="px-4 md:px-20">
            <div className="my-20 whitespace-pre-wrap text-base">
              {item.text}
            </div>
            {/* <Comments docId={item.doc_id} /> */}
            <div className="hidden md:block">
              {session.status == "authenticated" &&
                session.data?.user?.email == item.author && (
                  <div
                    className="font-medium flex justify-end"
                    aria-current="page"
                  >
                    <Link
                      href={{
                        pathname: "/edit",
                        query: {
                          mode: "update",
                        },
                      }}
                      className="hover:text-gray-400 hover:fill-current"
                    >
                      <span
                        className="flex"
                        onClick={() => {
                          setLoadingBg(true);
                          setContentState(item);
                        }}
                      >
                        edit{" "}
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
