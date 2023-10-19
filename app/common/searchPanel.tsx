"use client";
import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { SearchIcon, XIcon } from "./svg";
import { readTags } from "./serverfn";

const SearchPanel = () => {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { setSearchParameter } = useContext(MainContext);
  const [isSearch, setIsSearch] = useState(false);
  const [searchState, setSearchState] = useState("basic");
  const [tag, setTag] = useState<null | any>();

  useEffect(() => {
    async function readTag() {
      const i = await readTags();
      setTag(i);
    }
    readTag();
  }, []);

  return (
    <div className="flex flex-row justify-between">
      {(searchState == "basic" || searchState == "searching") && (
        <>
          {searchState == "searching" && (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                className="py-3 px-4 block w-30 h-5 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                placeholder="tag"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {/* <div className="flex flex-row justify-between">
            <input
              type="text"
              className="py-3 px-4 block w-20 h-5 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="start"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            ~
            <input
              type="text"
              className="py-3 px-4 block w-20 h-5 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="end"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div> */}
            </div>
          )}
          <div
            className="w-10 font-sm text-center flex flex-col justify-center items-center"
            onClick={() => {
              if (searchState == "searching") {
                if (text) {
                  const matchedTag = Object.keys(tag)
                    ?.map((e: string) =>
                      e.toLowerCase().search(text.toLowerCase()) >= 0 ? e : null
                    )
                    .filter((u: string | null) => !!u);
                  setSearchParameter({
                    tag: matchedTag ?? [],
                    startDate,
                    endDate,
                  });
                  setSearchState("searched");
                } else {
                  setSearchState("basic");
                }
              } else {
                setSearchState("searching");
              }
            }}
          >
            <SearchIcon />
          </div>
        </>
      )}
      {searchState == "searched" && (
        <span className="inline-flex items-center gap-1.5 py-1.5 pl-3 pr-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          keyword: {text}
          <button
            type="button"
            className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:text-gray-500"
            onClick={() => {
              setSearchParameter({
                tag: [],
                startDate,
                endDate,
              });
              setSearchState("basic");
              setText("");
            }}
          >
            <span className="sr-only">Remove badge</span>
            <XIcon />
          </button>
        </span>
      )}
    </div>
  );
};

export default SearchPanel;
