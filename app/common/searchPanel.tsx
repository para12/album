"use client";
import React, { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import { SearchIcon } from "./svg";

const SearchPanel = () => {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { setSearchParameter } = useContext(MainContext);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <div className="flex flex-rowjustify-between ">
      {isSearch && (
        <div className="flex flex-col gap-1">
          <input
            type="text"
            className="py-3 px-4 block w-30 h-5 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            placeholder="tag"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex flex-row justify-between">
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
          </div>
        </div>
      )}
      <div
        className="w-10 font-sm text-center flex flex-col justify-center items-center"
        onClick={() => {
          if (isSearch) {
            setSearchParameter({ tag: text, startDate, endDate });
            setIsSearch(false);
          } else {
            setIsSearch(true);
          }
        }}
      >
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchPanel;