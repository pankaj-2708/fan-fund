"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [dropdown, setdropdown] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="flex justify-between p-1  h-13  bg-gray-900 text-white items-center">
      <Link href={"/"}>
        <div className="logo flex items-center">
          <img src="/tea.gif" className="w-10 h-10 " alt="" />
          <div className="logo font-bold text-xl ">GetMeAChai!</div>
        </div>
      </Link>
      <div className="relative ">
        {session && (
          <>
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className=" mr-4 text-white bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => {
                setdropdown(!dropdown);
              }}
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdownHover "
              className={` z-10 absolute ${
                dropdown ? "hidden" : ""
              }hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 right-60`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200 "
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <Link href="/dashboard" legacyBehavior>
                    <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href={session.user.name}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </a>
                </li>
                <li
                  onClick={() => {
                    signOut();
                  }}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
            {/* </div> */}
            <button
              type="button"
              className="text-white mt-2 mr-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </button>
          </>
        )}
        {!session && (
          <Link href="/login">
            <button
              type="button"
              className="text-white mt-2 mr-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
