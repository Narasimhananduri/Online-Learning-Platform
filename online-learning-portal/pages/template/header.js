import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { isStudentLoggedIn, Logout, StudentData } from "../../utils/Student";
import { UserCircleIcon, UserIcon, LightningBoltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
const axios = require("axios");
import { API_URL } from "../../config/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [userFullName, setUserFullName] = useState(StudentData().FullName);

  const [userimage, setUserImage] = useState(StudentData().Image);

  const [loggedOut, setLoggedOut] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(isStudentLoggedIn());
  const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loggedOut === true) {
      router.reload(window.location.pathname);
    }
    if (isStudentLoggedIn() === true && StudentData().ID) {
      axios
        .post(API_URL + "get_points.php", {
          student: StudentData().ID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
          }
          if (!response?.data?.meta?.error) {
            setPoints(response?.data?.points > 0 ? response?.data?.points : 0);
          }
          setPageLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [loggedOut]);

  function logOut() {
    Logout();
    setLoggedOut(true);
  }
  return (
    <div className="">
      <main>
        <nav className="bg-white block w-full z-30 border-b border-gray-200">
          <div className=" mx-auto px-3 md:px-6 lg:px-2 xl:px-16">
            <div className="relative flex items-center justify-between h-24">
              {/* mobile header start */}
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                {/* Profile dropdown  */}
                {isStudentLoggedIn() === true ? (
                  <div className="ml-3 relative z-30" onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                    <div>
                      <button id="user-menu" aria-expanded="false" aria-haspopup="true" className="flex items-center transition duration-300 ease-in-out bg-gray-50 hover:text-help text-gray-700 px-2 py-2 rounded-md text-base font-medium ml-5">
                        
                      <img src={API_URL + userimage} alt="User Avatar" class="inline-block w-10 h-10 rounded-full mr-2" />   
                        {/* <UserCircleIcon className="w-7 h-7 inline-block mr-2" /> */}
                      </button>
                    </div>
                    <Transition
                      show={accountMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      {(ref) => (
                        <div ref={ref} className="absolute origin-top-right right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                          <Link href="/account/profile">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              View Profile
                            </a>
                          </Link>
                          <Link href="/account/edit-profile">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Edit Profile
                            </a>
                          </Link>
                          <Link href="/account/change-password">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Change Password
                            </a>
                          </Link>
                          {/* <Link href="/account/enrolled-courses">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Enrolled Courses
                            </a>
                          </Link> */}
                          <Link href="/account/webinars">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Webinars
                            </a>
                          </Link>
                          <a onClick={() => logOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                            Sign out
                          </a>
                        </div>
                      )}
                    </Transition>
                  </div>
                ) : (
                  ""
                )}
                {isStudentLoggedIn() !== true ? (
                  <Link href="/login">
                    <button type="button" className="inline-flex items-center justify-center rounded-md text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                      <span className="sr-only">Sign In</span>
                      <a href="#" className="text-gray-600 hover:text-blue-700 p-2 text-base">
                        Sign In
                      </a>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setMainMenuOpen(!mainMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <img className="block lg:hidden h-6 w-auto" src="/logo.png" alt="Workflow" />
                      <img className="hidden lg:block h-20 w-auto" src="/logo.png" alt="Workflow" />
                    </a>
                  </Link>
                </div>
              </div>
              {/* mobile header end */}
              {/* desktop header start */}
              <div className="absolute inset-y-0 right-0 hidden lg:flex items-center justify-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden lg:flex ml-10">
                  {/* <Link href="/">
                    <a className="focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out hover:text-help text-gray-700 px-3 py-2 rounded-md text-base font-medium ml-2">Home</a>
                  </Link> */}
                  {/* <div className="group" onMouseEnter={() => setCollectionMenuOpen(!collectionMenuOpen)} onMouseLeave={() => setCollectionMenuOpen(!collectionMenuOpen)}>
                    <a className="focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out group-hover:text-help cursor-pointer text-gray-700 px-3 py-2 rounded-md text-base font-medium ml-2">
                      Courses
                      <span className="transform group-hover:rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </a>
                    <Transition
                      show={collectionMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      {(ref) => (
                        <div ref={ref} className={`origin-center absolute top-18 pt-2`}>
                          <div className="w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <ul className="list-none px-6 py-1 pb-1">
                              <li className="py-2 hover:text-help cursor-pointer">HTML Tutorial</li>
                              <li className="py-2 hover:text-help cursor-pointer">CSS Tutotial</li>
                              <li className="py-2 hover:text-help cursor-pointer">JavaScript Tutorial</li>
                            </ul>
                            <Link href="/courses">
                              <a className="text-gray-600 flex justify-between py-2 px-6 bg-indigo-50 hover:text-help cursor-pointer rounded-b-md">
                                More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </a>
                            </Link>
                          </div>
                        </div>
                      )}
                    </Transition>
                  </div> */}
                  <Link href="/">
                    <a
                      className={
                        classNames(props.activePage === "Home" ? "text-help " : "text-gray-700 ") +
                        "focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out hover:text-help px-3 py-2 rounded-md text-base font-medium ml-2"
                      }>
                      Home
                    </a>
                  </Link>
                  <Link href="/courses" as="/courses">
                    <a
                      className={
                        classNames(props.activePage === "Courses" ? "text-help " : "text-gray-700 ") +
                        "focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out hover:text-help px-3 py-2 rounded-md text-base font-medium ml-2"
                      }>
                      Courses
                    </a>
                  </Link>
                  <Link href="/trending">
                    <a
                      className={
                        classNames(props.activePage === "Sponsors" ? "text-help " : "text-gray-700 ") +
                        "focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out hover:text-help px-3 py-2 rounded-md text-base font-medium ml-2"
                      }>
                      Trending Technologies
                    </a>
                  </Link>
                  <Link href="/certifications">
                    <a
                      className={
                        classNames(props.activePage === "Certifications" ? "text-help " : "text-gray-700 ") +
                        "focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out hover:text-help px-3 py-2 rounded-md text-base font-medium ml-2"
                      }>
                      Certifications
                    </a>
                  </Link>
                  <Link href="/html-compiler.html">
                    <a className="focus:ring-help focus:border-help flex items-center transition duration-300 ease-in-out hover:text-help text-gray-700 px-3 py-2 rounded-md text-base font-medium ml-2">Code Editor</a>
                  </Link>
                  
                  {isStudentLoggedIn() === true ? (
                    <Link href="/account/credits">
                      <a className="text-lg font-bold text-yellow-400 border-2 border-yellow-400 hover:text-yellow-500 hover:border-yellow-500 rounded-full px-3 py-1 ml-3 flex justify-start align-middle items-center" title="Your Learning Credits">
                        <LightningBoltIcon className="w-5 h-5" /> {points} Credits
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                
              </div>
              <div className="absolute inset-y-0 right-0 hidden lg:flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isStudentLoggedIn() === true ? (
                  ""
                ) : (
                  <Link href="/login">
                    <a className="flex items-center transition duration-300 ease-in-out text-help hover:text-help-dark px-5 py-2 rounded-md text-base font-medium ml-5">Sign In</a>
                  </Link>
                )}
                {isStudentLoggedIn() === true ? (
                  ""
                ) : (
                  <Link href="/register">
                    <a className="flex items-center transition duration-300 ease-in-out bg-help text-blue-50 hover:bg-help-dark pl-4 pr-5 py-2 rounded-md text-base font-medium ml-3">Sign Up</a>
                  </Link>
                )}
                {/* Profile dropdown  */}
                {isStudentLoggedIn() === true ? (
                  <div className="ml-3 relative z-30" onMouseEnter={() => setAccountMenuOpen(!accountMenuOpen)} onMouseLeave={() => setAccountMenuOpen(!accountMenuOpen)}>
                    <div>
                      <button id="user-menu" aria-expanded="false" aria-haspopup="true" className="flex items-center transition duration-300 ease-in-out hover:text-help text-gray-700 px-5 py-5 rounded-md text-base font-medium ml-5">
                      <img src={API_URL + userimage} alt="User Avatar" class="inline-block w-7 h-7 rounded-full mr-2" />   <span>{userFullName}</span>
                      </button>
                    </div>
                    <Transition
                      show={accountMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      {(ref) => (
                        <div
                          ref={ref}
                          className="absolute origin-top-right right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu">
                          {/* <div className="-mt-1 px-4 py-2 border-b bg-points-background bg-cover flex-row items-center justify-center align-middle">
                            <div className="text-sm text-gray-100">LEARNING CREDITS</div>
                            <div className="text-4xl font-bold text-yellow-300 flex justify-start align-middle items-center">
                              <LightningBoltIcon className="w-7 h-7" /> 100
                            </div>
                          </div> */}
                          <div className="-mt-1 px-4 py-2 border-b bg-cover flex-row items-center justify-center align-middle">
                            <div className="text-md text-gray-700 mt-2">{userFullName}</div>
                            <div className="mb-2 text-md font-bold text-black flex justify-start align-middle items-center">
                              #{StudentData().UniqueID}
                            </div>
                          </div>

                          <Link href="/account/profile">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              View Profile
                            </a>
                          </Link>
                          <Link href="/account/edit-profile">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Edit Profile
                            </a>
                          </Link>

                          <Link href="/account/change-password">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Change Password
                            </a>
                          </Link>
                          {/* <Link href="/account/enrolled-courses">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Enrolled Courses
                            </a>
                          </Link> */}
                          <Link href="/account/webinars">
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                              Webinars
                            </a>
                          </Link>
                          <a onClick={() => logOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">
                            Sign out
                          </a>
                        </div>
                      )}
                    </Transition>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Transition
            show={mainMenuOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            {(ref) => (
              <div ref={ref} className={`transition ease-in-out duration-200`} id="mobile-menu">
                <div className="relative rounded-md shadow-sm m-3">
                  <input type="text" name="query" id="search_query" className="focus:ring-help focus:border-help block w-full pl-5 pr-10 text-md sm:text-sm border-gray-300 rounded-md" placeholder="Enter keyword.." />
                  <div className="absolute inset-y-0 right-3 flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link href="/">
                    <a className={classNames(props.activePage === "Home" ? "text-help " : "text-gray-700 ") + "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"} aria-current="page">
                      Home
                    </a>
                  </Link>
                  <Link href="/courses" as="/courses">
                    <a className={classNames(props.activePage === "Courses" ? "text-help " : "text-gray-700 ") + "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"} aria-current="page">
                      Courses
                    </a>
                  </Link>
                  <Link href="/html-compiler.html">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
                      Code Editor
                    </a>
                  </Link>
                  <Link href="/trending">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Trending Technologies</a>
                  </Link>
                  <Link href="/certifications">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Certifications</a>
                  </Link>
                </div>
              </div>
            )}
          </Transition>
        </nav>
        {/* <div class="bg-red-900 text-center py-4 lg:px-4">
          <Link href="/account/verify">
            <a class="cursor-pointer p-2 bg-red-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
              <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Alert</span>
              <span class="font-semibold mr-2 text-left flex-auto">Please upload consent form and verify your account</span>
              <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </a>
          </Link>
        </div> */}
      </main>
    </div>
  );
}
