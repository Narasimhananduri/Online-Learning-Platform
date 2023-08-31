import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";
import { courseLevels } from "../../../utils/Data";
import Chapters from "../../../components/layouts/Chapters";

export default function Level(props) {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const slug = router.query.slug;
  const [courseModules, setCourseModules] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Level.getInitialProps = () => {
    return {};
  };

  useEffect(() => {
    // console.log(router);
    // console.log(props);
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/courses/level/" + slug);
    }
    if (isStudentLoggedIn() === true) {
      slug
        ? axios
            .post(API_URL + "courses/get_module_courses.php", {
              level: courseLevels.find((x) => x.slug == slug).id,
              student: StudentData().ID,
            })
            .then(function (response) {
              if (response?.data?.meta?.error) {
                setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
              }
              if (!response?.data?.meta?.error) {
                setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
                setCourseModules(response?.data?.data);
                // console.log(response?.data?.data);
              }
              setPageLoading(false);
            })
            .catch(function (error) {
              console.log(error);
            })
        : "";
    }
  }, [router]);
  return pageLoading === false ? (
    <>
      <Head>
        <title>Help Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header activePage="Courses" />

      <div>
        <section class="py-20 bg-indigo-100">
          <div class="container max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold tracking-tight text-center">{slug ? courseLevels.find((x) => x.slug == slug).title : ""} Modules</h2>
            {/* <p class="mt-2 text-lg text-center text-gray-600">Check out our list of {slug ? courseLevels.find((x) => x.slug == slug).slug : ""} modules below.</p> */}
            <div class="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
              {courseModules ? (
                courseModules.map((module, index) => {
                  return (
                    <>
                      {/* <Link key={module.ID} href={"/courses/module/" + module.ID}> */}
                      {/* <a class="bg-cover bg-no-repeat bg-center duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-start justify-between col-span-4 px-6 pt-6 pb-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={module.Image} className="rounded-xl" />
                        <h4 class="text-xl font-medium text-gray-700">{module.ModuleTitle}</h4>
                        <p class="text-base text-left text-gray-500">{module.ModuleDescription}</p>
                      </a> */}
                      <div class="bg-cover bg-no-repeat bg-center relative col-span-12 overflow-hidden bg-white rounded-xl">
                        {/* <img src={ADMIN_URL + module.Image} className="rounded-xl h-48 w-full" /> */}
                        <div class="font-medium text-gray-700 px-6 py-3 border-b-2 flex justify-between items-center">
                          <div>
                            <span className="text-sm text-help">Module {index + 1}:</span>
                            <h4 className="text-xl">{module.ModuleTitle}</h4>
                          </div>
                          {/* <span class="bg-help py-2 px-5 rounded-lg text-help-lighter">Try Assesment</span> */}
                        </div>
                        <div class="auto-rows-max p-4 mx-5 grid grid-cols-4 gap-8 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0 overflow-x-auto flex-nowrap">
                          <Chapters module_id={module.ID} title={module.ModuleTitle} courses={module.Courses} />
                        </div>
                        {/* <p class="text-base text-left text-gray-500 px-6 pb-8">{module.ModuleDescription}</p> */}
                      </div>
                      {/* <a class="bg-cover bg-no-repeat bg-center duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-start justify-between col-span-4 px-6 pt-6 pb-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={module.Image} className="rounded-xl" />
                        <h4 class="text-xl font-medium text-gray-700">{module.ModuleTitle}</h4>
                        <p class="text-base text-left text-gray-500">{module.ModuleDescription}</p>
                      </a> */}

                      {/* </Link> */}
                    </>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto">
                  {/* <div className="absolute bg-help opacity-50"> */}
                  {/* style={{ backgroundImage: "url(http://localhost:3000/css.jpg)" }} */}
                  {/* </div> */}
                  <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                  No courses available in this level.
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
