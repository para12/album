"use client";

import { useEffect, useState } from "react";
import NewComment from "./newComment";
import { GetUsername, trimDate } from "@/app/common/util";
import { readDocComments } from "@/app/common/serverfn";
import { useSession } from "next-auth/react";

export default function Comments({ docId }: any) {
  const [comments, setComments] = useState<null | any[]>(null);
  const session = useSession();

  useEffect(() => {
    async function readComments(id: any) {
      const commentsArr = await readDocComments(id);
      setComments(commentsArr);
    }
    readComments(docId);
  }, []);

  return (
    <div>
      <div
        className="hs-collapse-toggle flex justify-center items-center my-5"
        id="hs-show-hide-collapse"
        data-hs-collapse="#hs-show-hide-collapse-heading"
      >
        <span className="hs-collapse-open mr-2">댓글</span>
        <svg
          className="hs-collapse-open:rotate-180 w-2.5 h-2.5"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        id="hs-show-hide-collapse-heading"
        className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-show-hide-collapse"
      >
        {comments &&
          comments.map((comment: any) => (
            <div key={comment.added_at}>
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-1">
                {GetUsername(comment.commenter)}
              </span>
              <span>{comment.text}</span>
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-1">
                {trimDate(comment.added_at)}
              </span>
            </div>
          ))}
        {session.status == "authenticated" && (
          <NewComment
            docId={docId}
            comments={comments}
            user={session.data?.user}
            addComment={setComments}
          />
        )}
      </div>
    </div>
  );
}
