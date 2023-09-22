"use client";
import CloudinaryImage from "@/app/common/cloudinaryImage";
import { addSharpToTag, dateFormat } from "@/app/common/util";
import Comments from "./comments";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MainContext } from "@/app/context/MainContext";
import { readSingleDoc } from "@/app/common/serverfn";
import { useSession } from "next-auth/react";

export default function Content({ docId }: { docId: string }) {
  const session = useSession();
  const [item, setItem] = useState<null | any>(null);
  const { setContentState } = useContext(MainContext);

  useEffect(() => {
    async function readDoc(id: any) {
      const i = await readSingleDoc(id);
      setItem(i);
    }
    readDoc(docId);
  }, []);

  return (
    <div className="mx-auto">
      {item && (
        <div>
          <CloudinaryImage
            src={item.public_id}
            alt={addSharpToTag(item.tag)}
            width={1000}
            height={1000}
            sizes="100vw"
          />
          <div className="w-full my-3 text-right">
            {dateFormat(item.photo_captured_at)} {addSharpToTag(item.tag)}
          </div>
          <div className="md:px-20">
            <div className="my-20">{item.text}</div>
            <div>
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
                        onClick={() => setContentState(item)}
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
            <Comments docId={item.doc_id} />
          </div>
        </div>
      )}
    </div>
  );
}
