"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainContext } from "../context/MainContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { GetUploadPermission } from "./serverfn";
import SearchPanel from "./searchPanel";
import { LoadingIcon, PlusIcon, SideMenuButtonToggle } from "./svg";

const NavBar = () => {
  const session = useSession();
  const { setLoadingBg } = useContext(MainContext);
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
    <header className="flex flex-wrap w-full mt-2 mb-5 px-10 md:justify-between md:flex-nowrap z-50 bg-white text-sm py-4 dark:bg-gray-800 ">
      <nav
        className="w-full md:flex md:items-center md:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            <span onClick={() => setLoadingBg(true)}>Sonia & Jinu</span>
          </a>
          <SideMenuButtonToggle />
        </div>

        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
        >
          <div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:pl-5">
            {pathname == "/" && <SearchPanel />}

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
                    <PlusIcon />
                  </Link>
                </div>
              )}

            {session.status == "loading" ? (
              <div className="flex">
                <LoadingIcon />
                {/* <span className="ml-3">checking status...</span> */}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
