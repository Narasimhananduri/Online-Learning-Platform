import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon, CheckCircleIcon, CodeIcon, DesktopComputerIcon, LockClosedIcon, LockOpenIcon, TerminalIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../config/constants";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { CheckIcon } from "@heroicons/react/outline";
import Popup from "../../components/ui/ok";

export default function Home() {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [certificateProgress, setCertificateProgress] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [openLockedPopup, setOpenLockedPopup] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [lockedPopupData, setLockedPopupData] = useState({ title: "", message: "", icon: "" });
  Home.getInitialProps = () => {
    return {};
  };
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/courses");
    }
    if (isStudentLoggedIn() === true) {
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
    }
  }, [pageLoading]);

  function handleLockedPopup(message) {
    setOpenLockedPopup(true);
    setLockedPopupData({ title: "Course Locked", message: message, icon: "lock" });
  }

  function handlePopupClosed() {
    setOpenLockedPopup(false);
  }

  return pageLoading === false ? (
    <>
      <Head>
        <title>Help Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header activePage="Courses" />
      <div>
        <section class="py-20 bg-indigo-100 md:h-screen">
          <div class="container max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold tracking-tight text-center">Courses</h2>
            {/* <p class="mt-2 text-lg text-center text-gray-600">Select prefered course level below.</p> */}
            <div class="p-4 md:p-0 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-12 lg:grid-cols-12 sm:px-8 xl:px-0">
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <DesktopComputerIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700">Basic Coding</h4>
                <p class="text-base text-center text-gray-500">Lets get started with the basic coding course.</p>
                <Link href="/courses/level/beginner">
                  <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Course</a>
                </Link>
              </div>
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <CodeIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700">Intermediate Coding</h4>
                <p class="text-base text-center text-gray-500">Lets get started with the intermediate coding course.</p>

                <Link href="/courses/level/intermediate">
                  <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Course</a>
                </Link>
              </div>
              <div class="relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 bg-gray-100 rounded-xl">
                <div class="p-3 text-white bg-blue-500 rounded-full">
                  <TerminalIcon class="h-6 w-6 text-white" />
                </div>
                <h4 class="text-xl font-medium text-gray-700">Advanced Coding</h4>
                <p class="text-base text-center text-gray-500">Lets get started with the advanced coding course.</p>

                <Link href="/courses/level/advanced">
                  <a class="cursor-pointer flex justify-center items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full duration-150 hover:scale-105 transform hover:shadow-2xl">Start Course</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
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
