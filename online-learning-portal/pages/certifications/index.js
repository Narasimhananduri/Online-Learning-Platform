import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { courseLevels } from "../../utils/Data";
import { ArrowNarrowRightIcon, CheckCircleIcon, CodeIcon, DesktopComputerIcon, LockClosedIcon, LockOpenIcon, TerminalIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../config/constants";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { CheckIcon } from "@heroicons/react/outline";
import Popup from "../../components/ui/ok";


export default function Quizzes() {
  const router = useRouter();
  const [courses, setCourses] = useState();
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [certificateProgress, setCertificateProgress] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [openLockedPopup, setOpenLockedPopup] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [lockedPopupData, setLockedPopupData] = useState({ title: "", message: "", icon: "" });
  Quizzes.getInitialProps = async () => {
    return {};
  };
  useEffect(() => {
    axios
      .post(API_URL + "courses/get_certificate_status.php", {
        student: StudentData().ID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
          setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response?.data?.meta?.error) {
          setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          setCertificateProgress(response?.data?.data);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [pageLoading]);

  function handleLockedPopup(message) {
    setOpenLockedPopup(true);
    setLockedPopupData({ title: "Course Locked", message: message, icon: "lock" });
  }

  function handlePopupClosed() {
    setOpenLockedPopup(false);
  }

  // useEffect(() => {
  //   module
  //     ? axios
  //         .post(API_URL + "certificates/get_quizzes.php")
  //         .then(function (response) {
  //           if (response?.data?.meta?.error) {
  //             setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
  //           }
  //           if (!response?.data?.meta?.error) {
  //             setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
  //             setCourses(response?.data?.data);
  //             setPageLoading(false);
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         })
  //     : "";
  // }, [router]);
  return pageLoading === false ? (
    <>
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      <div>
        <section class="py-20 bg-indigo-100">
          <div class="container max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold tracking-tight text-center">Certifications</h2>
            {courses ? (
              <>
                {/* <p class="mt-2 text-lg text-center text-gray-600">Check out our list of certifications below.</p> */}
              </>
            ) : (
              ""
            )}
            <div class="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
            <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <DesktopComputerIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700">Basic Coding</h4>
                <p class="text-base text-center text-gray-500">Complete assessment to get Basic coding certificate.</p>
                <Link href={isStudentLoggedIn() === true ? "/certifications/basic" : "/login?refer=/certifications/basic"} >
                  <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Assessment</a>
                </Link>
              </div>
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <CodeIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700">Intermediate Coding</h4>
                <p class="text-base text-center text-gray-500">Complete assessment to get Intermediate coding certificate.</p>
                {certificateProgress >= 2 || certificateProgress == 1 ? (
                  <Link href={isStudentLoggedIn() === true ? "/certifications/intermediate" : "/login?refer=/certifications/intermediate"} >
                    <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Assessmet</a>
                  </Link>
                ) : (
                  <a
                    onClick={() => handleLockedPopup("Please complete basic coding certification first.")}
                    class="cursor-pointer flex justify-center items-center bg-opacity-60 bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">
                    <LockClosedIcon className="w-4 h-4 mr-2" /> Start Assessment
                  </a>
                )}
              </div>
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <TerminalIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700">Advanced Coding</h4>
                <p class="text-base text-center text-gray-500">Complete assessment to get Advanced coding certificate..</p>
                {certificateProgress >= 3 || certificateProgress == 2 ? (
                  <Link href={isStudentLoggedIn() === true ? "/certifications/advanced" : "/login?refer=/certifications/advanced"} >
                    <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Assessmet</a>
                  </Link>
                ) : (
                  <a
                    onClick={() => handleLockedPopup("Please complete intermediate coding certification first.")}
                    class="cursor-pointer flex justify-center items-center bg-opacity-60 bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">
                    <LockClosedIcon className="w-4 h-4 mr-2" /> Start Assessment
                  </a>
                )}
              </div>
              
              
              
              {/* {courses ? (
                courses.map((course) => {
                  return (
                    <div class="duration-150 hover:scale-105 transform hover:shadow-2xl relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl text-gray-700 hover:text-help">
                      <h4 class="text-xl font-medium">{course.Title}</h4>
                      <p class="text-base text-center text-gray-500">{course.Description}</p>
                      <Link key={course.ID} href={isStudentLoggedIn() === true ? "/certifications/" + course.Slug : "/login?refer=/certifications/" + course.Slug}>
                        <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                          <span>Get Certificate</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto">
                  <img src="../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                  No certificates available in this module.
                </div>
              )} */}
            </div>
          </div>
        </section>
      </div>
      <Popup open={openLockedPopup} handleClosed={() => handlePopupClosed()} message={lockedPopupData.message} title={lockedPopupData.title} buttonText="OK" icon={lockedPopupData.icon} />
      <Footer />
    </>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
      <span class="relative h-20 w-20">
        <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
      </span>
    </div>
  );
}
