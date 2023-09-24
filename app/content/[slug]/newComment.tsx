"use client";

import { useState } from "react";
import { GetUsername } from "@/app/common/util";
import { updateComment } from "@/app/common/serverfn";

export default function NewComment({ docId, comments, user, addComment }: any) {
  const [comment, setComment] = useState("");

  return (
    <div>
      <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-1">
        {GetUsername(user)}
      </span>
      <input
        type="text"
        className="w-2/3 border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></input>
      {comment && (
        <button
          onClick={(e) => {
            e.preventDefault();
            let new_comments = comments ? [...comments] : [];
            new_comments.push({
              text: comment,
              added_at: new Date().toLocaleString(),
              commenter: user.email,
            });
            updateComment(new_comments, docId);
            addComment(new_comments);
            setComment("");
          }}
          className="mx-3"
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="hover:text-blue-500 hover:fill-current"
          >
            <path d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z" />
          </svg>
        </button>
      )}
    </div>
  );
}
