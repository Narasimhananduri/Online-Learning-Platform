import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { XIcon } from "@heroicons/react/outline";
import Chapters from "./chaptersList-bk";
import AssessmentChapters from "./assessmentChapters-bk";
const Enroll = (props) => {
  const [isShowing, setIsShowing] = useState(props.open);
  const [coursesdisplay, setCoursesDisplay] = useState(true);
  const [assessmentdisplay, setAssessmentDisplay] = useState(false);

  const [id, setId] = useState(props.id);

  const [userdata, setUserData] = useState();
  const [userdata1, setUserData1] = useState();

  const [tabs, setTabs] = useState([
    {
      name: "Course",
      href: "#",
      course: true,
      assessment: false,
      current: true,
    },
    {
      name: "Assessment",
      href: "#",
      course: false,
      assessment: true,
      current: false,
    },
    // { name: 'Team Members', href: '#', current: false },
    // { name: 'Billing', href: '#', current: false },
  ]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const closed = () => {
    // setIsShowing(false);
    props.onChangeOpen();
  };

  useEffect(() => {
    setIsShowing(props.open);

    axios
      .post(API_URL + "students/get_modules.php", {
        level: 1,
        student: props.id,
      })
      .then(function (response) {
        console.log(response.data?.data);
        setUserData(response.data?.data);
      });

    axios
      .post(API_URL + "students/get_assessment_modules.php", {
        level: 1,
        student: props.id,
      })
      .then(function (response) {
        console.log(response.data?.data);
        setUserData1(response.data?.data);
      });
  }, [props.open]);




  function handleTabActive(id) {
    tabs.map((tab, tabIndx)=>{
      if(tabIndx===id){
        tabs[tabIndx].current = true;
      } else {
        tabs[tabIndx].current = false;
      }
    });
  }





  
  return (
    <Transition.Root show={isShowing} as={Fragment}>
      <Dialog
        as="div"
        static
        className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40"
        open={isShowing}
        onClose={closed}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Student Progress
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Bellow is the complete student progress of courses
                            and assessments.
                          </p>
                        </div>
                        <div className="h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => closed()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="tabs"
                          name="tabs"
                          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden sm:block">
                        <nav
                          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab, tabIdx) => (
                            <a
                              onClick={() => {
                                setCoursesDisplay(tab.course);
                                setAssessmentDisplay(tab.assessment);
                                handleTabActive(tabIdx);
                              }}
                              key={tab.name}
                              href={tab.href}
                              className={classNames(
                                tab.current
                                  ? "text-gray-900"
                                  : "text-gray-500 hover:text-gray-700",
                                tabIdx === 0 ? "rounded-l-lg" : "",
                                tabIdx === tabs.length - 1
                                  ? "rounded-r-lg"
                                  : "",
                                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                              )}
                              aria-current={tab.current ? "page" : undefined}
                            >
                              <span>{tab.name}</span>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  tab.current
                                    ? "bg-indigo-500"
                                    : "bg-transparent",
                                  "absolute inset-x-0 bottom-0 h-0.5"
                                )}
                              />
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>

                    {/* <div class="px-10 py-3 flex justify-center">
                      <div class="inline-flex">
                        <button
                          onClick={() => {
                            setCoursesDisplay(true);
                            setAssessmentDisplay(false);
                          }}
                          type="button"
                          class="w-1/2 inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-l active:z-1 focus:z-1 -mr-px border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200"
                        >
                          Courses
                        </button>
                        <button
                          onClick={() => {
                            setAssessmentDisplay(true);
                            setCoursesDisplay(false);
                          }}
                          type="button"
                          class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 active:z-1 focus:z-1 -mr-px border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200"
                        >
                          Assessments
                        </button>
                      </div>
                    </div> */}

                    <div class=" bg-gray-200">
                      {coursesdisplay === true && assessmentdisplay === false ? (
                        <div class="border border-gray-200 rounded bg-white divide-gray-200 overflow-hidden">
                          {userdata
                            ? userdata.map((data) => (
                                <div key={data?.ID} class="m-5 border-2 rounded-xl items-center text-gray-700 hover:text-gray-700 hover:bg-gray-50 active:bg-white" href="javascript:void(0)">
                                  <div>
                                    <p class="p-4 font-semibold text-sm px-5">{data?.ModuleTitle}</p>
                                  </div>
                                  <div class="auto-rows-max grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 sm:px-8 xl:px-0 overflow-x-auto flex-nowrap">
                                    <Chapters module_id={data.ID} title={data.ModuleTitle} student={props.id} />
                                  </div>
                                </div>
                              ))
                            : ""}
                        </div>
                      ) : (
                        ""
                      )}

                      {coursesdisplay === false && assessmentdisplay === true ? (
                        <div class="border border-gray-200 rounded bg-white divide-gray-200 overflow-hidden">
                          {userdata1
                            ? userdata1.map((data) => (
                                <div key={data?.ID} class="m-5 border-2 rounded-xl items-center text-gray-700 hover:text-gray-700 hover:bg-gray-50 active:bg-white" href="javascript:void(0)">
                                  <div>
                                    <p class="p-4 font-semibold text-sm px-5 flex justify-between">{data?.ModuleTitle}<span>{data?.quizStatus}</span></p>
                                  </div>
                                  <div class="auto-rows-max grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 sm:px-8 xl:px-0 overflow-x-auto flex-nowrap">
                                    <AssessmentChapters module_id={data.ID} title={data.ModuleTitle} student={props.id} />
                                  </div>
                                </div>
                              ))
                            : ""}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Enroll;
