"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainContext } from "../context/MainContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { GetUploadPermission } from "./serverfn";

const NavBar = () => {
  const session = useSession();
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { setSearchParameter, setLoadingBg } = useContext(MainContext);
  const pathname = usePathname();
  const [isSuper, setIsSuper] = useState(false);

  useEffect(() => {
    async function uploadPermit() {
      if (await GetUploadPermission(session.data?.user)) {
        setIsSuper(true);
      }
    }
    uploadPermit();
  }, [session.data?.user]);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 bg-white text-sm py-4 dark:bg-gray-800 w-full h-20 mt-2 mb-5">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 md:flex md:items-center md:justify-between"
        aria-label="Global"
      >
        <div
          className="flex items-center justify-between"
          onClick={() => setLoadingBg(true)}
        >
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            Sonia & Jinu
          </a>
          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        {session.status == "loading" ? (
          <div className="flex">
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
            </svg>
            <span className="ml-3">checking status...</span>
          </div>
        ) : (
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          >
            <div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:pl-5">
              {session.status == "authenticated" &&
                isSuper &&
                pathname.substring(0, 5) != "/edit" && (
                  <div
                    className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                    aria-current="page"
                    onClick={() => setLoadingBg(true)}
                  >
                    <Link
                      href={{
                        pathname: "/edit",
                        query: {
                          mode: "upload",
                        },
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      >
                        <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
                      </svg>
                    </Link>
                  </div>
                )}
              {pathname == "/" && (
                <div className="flex flex-rowjustify-between ">
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
                  <div
                    className="w-10 font-sm text-center flex flex-col justify-center items-center"
                    onClick={() =>
                      setSearchParameter({ tag: text, startDate, endDate })
                    }
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                    </svg>
                  </div>
                </div>
              )}

              {session.status != "authenticated" ? (
                <div>
                  <button
                    className="font-medium text-gary-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                    onClick={() => signIn("google")}
                  >
                    Login
                  </button>
                </div>
              ) : (
                <>
                  <div className="font-medium text-gray-600">
                    {session.data?.user?.name}
                  </div>
                  <div className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500">
                    <button onClick={() => signOut()}>Log Out</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
