import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon, QuestionMarkCircleIcon, ClipboardListIcon } from "@heroicons/react/outline";
import { courseLevels } from "../../utils/Data";

export default function Chapters(props) {
  const router = useRouter();
  const id = props.module_id;
  const [courses, setCourses] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Chapters.getInitialProps = async () => {
    return {};
  };

  useEffect(() => {
    id
      ? axios
          .post(API_URL + "students/get_courses.php", {
            module: id,
            student: props.student,
          })
          .then(function (response) {
            if (response?.data?.meta?.error) {
              setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
            }
            if (!response?.data?.meta?.error) {
              setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
              setCourses(response?.data?.data);
              setPageLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      : "";
  }, [router]);
  return pageLoading === false ? (
    <>
      {courses ? (
        courses.map((course, index) => {
          return (
            <div class="border-t flex justify-start items-center col-span-4 px-5 overflow-hidden text-gray-700">
              <div className="w-20 h-16 my-4">
                <div className="h-16 w-20 mx-auto border-r border-help flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <p className="text-help text-base font-bold">{((course.student_progress / course.total_topics) * 100).toFixed(0)}%</p>
                    <p className="text-gray-600 text-xs">
                      {course.student_progress}/{course.total_topics} Topics
                    </p>
                  </div>
                </div>
              </div>
              <div className="pl-5 my-2">
                <span class="text-xs">Chapter {index + 1}:</span>
                <h4 class="text-md font-medium">{course.Title}</h4>
                <span class="font-bold py-1 rounded inline-flex items-center">
                  <span>{(course.student_progress / course.total_topics) * 100 == 100 ? (<span className='text-green-500'>Completed</span>) : (course.student_progress / course.total_topics) * 100 > 0 ? (<span className='text-indigo-500'>In Progress</span>) : (<span className='text-red-500'>Not Started</span>)}</span>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-12 text-center py-5 mx-auto">
          <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
          No courses available in this module.
        </div>
      )}
    </>
  ) : (
    <div className="flex justify-center items-center bg-indigo-100">
      <span class="relative h-20 w-20">
        <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
      </span>
    </div>
  );
}
