"use client";

import Link from "next/link";
import CloudinaryImage from "./common/cloudinaryImage";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "./context/MainContext";
import { readDocsWithConstraints } from "./common/serverfn";

export default function Contents() {
  const [items, setItems] = useState<null | any[]>(null);
  const { searchParameter, setContentState, setLoadingBg } =
    useContext(MainContext);

  useEffect(() => {
    async function readDocs(s: any) {
      const is = await readDocsWithConstraints(s);
      setItems(is);
    }
    readDocs(searchParameter);
    setLoadingBg(false);

    // const itemArr: any[] = [];
    // const data = onSnapshot(
    //   query(collection(db, "article"), ...constraints),
    //   (QuerySnapshot) => {
    //     console.log("in");
    //     QuerySnapshot.forEach((doc) => {
    //       itemArr.push(doc.data());
    //     });
    //   }
    // );
    // setItems(itemArr);
  }, [searchParameter, setLoadingBg]);

  return (
    <>
      {items && (
        <div className="grid grid-cols-1 gap-x-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-24 animate-bgColorIn">
          {items.map((item: any) => {
            return (
              <div
                key={item.public_id}
                className="relative"
                onClick={() => {
                  setContentState({ ...item });
                  setLoadingBg(true);
                }}
              >
                <Link href={`/content/${item.doc_id}`}>
                  <CloudinaryImage
                    src={item.public_id}
                    alt={item.tag}
                    width={800}
                    height={600}
                    crop="fill"
                    sizes="100vw"
                  />
                  {/* <div className="absolute top-0 left-0 text-gray-400 text-xs">
                    {dateFormat(item.photo_captured_at)}{" "}
                  </div> */}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
