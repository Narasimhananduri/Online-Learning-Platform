import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { courseLevels } from "../../utils/Data";

export default function Enrolled() {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [courses, setCourses] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Enrolled.getInitialProps = async () => {
    return {};
  };

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
    axios
      .post(API_URL + "courses/enrolled_courses.php", {
        user_id: StudentData().ID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
          setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response?.data?.meta?.error) {
          setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          setCourses(response?.data?.data);
          // console.log(response?.data?.data);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router]);
  return pageLoading === false ? (
    <>
      <Head>
        <title>Help Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />

      <div>
        <section class="py-20 bg-indigo-100">
          <div class="container max-w-6xl mx-auto">
            {courses ? (
              <>
                <h2 class="text-4xl font-bold tracking-tight text-center"> Enrolled Courses</h2>
                <p class="mt-2 text-lg text-center text-gray-600">Check out your list of enrolled courses below.</p>
              </>
            ) : (
              ""
            )}
            <div class="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
              {courses ? (
                courses.map((course) => {
                  return (
                    <a class="duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-center justify-between col-span-4 px-8 py-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl text-gray-700">
                      <h4 class="text-xl font-medium">{course.Title}</h4>
                      <p class="text-base text-center text-gray-500">{course.Description}</p>
                      <div className="flex">
                        <Link key={course.ID} href={isStudentLoggedIn() === true ? "/courses/" + course.Slug : "/login?refer=/courses/" + course.Slug}>
                          <a class="bg-help hover:bg-help-dark text-gray-100 font-bold py-2 px-4 rounded inline-flex items-center">
                            <span>Continue Course</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </Link>
                        {/* <Link key={course.ID} href={isStudentLoggedIn() === true ? "/quizzes/" + course.Slug : "/login?refer=/courses/" + course.Slug}>
                          <a class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <span>Quiz</span>
                          </a>
                        </Link> */}
                      </div>
                    </a>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto">
                  <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                  No courses available in this module.
                </div>
              )}
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
