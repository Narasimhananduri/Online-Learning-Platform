import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { ADMIN_URL, API_URL } from "../config/constants";
import { isStudentLoggedIn, StudentData } from "../utils/Student";
import Banner from "../components/ui/banner";

export default function Home() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [courseModules, setCourseModules] = useState(false);
  const [webinarData, setWebinarData] = useState();
  const [studentID, setStudentID] = useState(StudentData().ID ? StudentData().ID : 0);
  useEffect(() => {
    axios
      .post(API_URL + "home.php", {
        level: 1,
        student: studentID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
          // setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response?.data?.meta?.error) {
          // setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          setCourseModules(response?.data?.data);
          setWebinarData(response?.data?.webinar);
          // console.log(response?.data?.data);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const supporters = [
    {
      name: "Wells Fargo",
      role: "Copywriter",
      imageUrl: "/wells-fargo.png",
      twitterUrl: "#",
      linkedinUrl: "#",
    },
    {
      name: "Sponsor 2",
      role: "Copywriter",
      imageUrl: "/sponsor-placeholder.jpg",
      twitterUrl: "#",
      linkedinUrl: "#",
    },
  ];
  return (
    <>
      <Head>
        <title>Help Online Learning</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      {webinarData ? (
        new Date(webinarData.Date + " " + webinarData.StartTime).getTime() >= new Date().getTime() ? (
          <Banner
            show={true}
            message={webinarData.WebinarTitle + " on " + webinarData.Date + " " + new Date(webinarData.Date + " " + webinarData.StartTime).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
            link={webinarData.WebinarLink}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <Header activePage="Home" />
      <section className="bg-white text-gray-600 body-font">
        <div className="mx-auto flex pb-10 md:py-5 px-3 md:px-1 lg:py-20 lg:px-10 md:flex-row flex-col-reverse items-center justify-between xl:px-28">
          <div className="max-w-3xl lg:flex-grow md:w-2/3 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center md:ml-3 lg:ml-0">
            <h1 className="title-font text-3xl sm:text-4xl mb-4 font-bold text-gray-900">Coding classes for all</h1>
            <p className="mb-8 text-lg leading-relaxed">
            Coding is a game-changer and the ones who are skilled in coding have a competitive advantage in career. It is true that computer programming was once recognised as a skill reserved for computer nerds and geeks but now, it is popular as an essential ability as well as an added advantage for many job profiles.The overall goal of this Website is to provide training in computational programming and coding.
            </p>
            <div className="flex justify-center">
              <Link href="/courses">
                <a className="transition duration-300 ease-in-out shadow-lg inline-flex text-white bg-help border-0 py-2 px-6 focus:outline-none hover:bg-help-dark rounded-md text-lg">Explore Courses</a>
              </Link>
            </div>
          </div>
          <div className="mb-10 flex right-0 justify-end lg:max-w-lg lg:w-full md:w-1/3 w-5/6 items-center">
            <img className="object-cover object-center rounded" alt="hero" src="./home-slider.svg" />
          </div>
        </div>
      </section>

      {/* start trending courses */}
      <section className="bg-indigo-100 text-gray-600 body-font xl:px-28">
        <div className=" mx-auto py-10 pb-10 md:py-10 px-3 md:px-6 lg:py-24 lg:px-1">
          <div className="title-font text-2xl sm:text-4xl mb-10 font-bold text-gray-900 flex justify-center">Start with Basic Coding</div>
          <div className="grid lg:grid-cols-3 grid-cols-1  ">
            {courseModules ? (
              courseModules.map((module, key) => {
                return key < 3 ? (
                  <div className="md:px-5">
                    <div className="card bg-white rounded-2xl">
                      <img src={ADMIN_URL + module.Image} alt="cannot find" className="rounded-2xl rounded-b-none object-cover h-36 md:h-52 w-full" />
                      <div className="m-5">
                        <div className="title">
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-500 bg-indigo-100 rounded">{module.Title}</span>
                        </div>
                        <div className="body text-gray-500 py-3">{module.Description}</div>
                        <div className="flex justify-end">
                          <Link key={module.ID} href={isStudentLoggedIn() === true ? "/courses/" + module.Slug : "/login?refer=/courses/" + module.Slug}>
                            <a>
                              <button className="text-indigo-500 mb-5 hover:text-blue-900 transform transition px-4 py-1 rounded-lg">
                                Get started
                                <ArrowNarrowRightIcon className="ml-2 h-4 inline-block hover:ml-4" />
                              </button>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })
            ) : (
              <div className="col-span-12 text-center py-5 mx-auto">
                <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                No courses available in this level.
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Link href="/courses">
              <a>
                <button className="text-indigo-500 border-2 border-indigo-500 mt-7 hover:text-indigo-50 hover:bg-indigo-500 hover:border-indigo-500 transform transition px-10 py-1 rounded-lg">
                  See More
                  <ArrowNarrowRightIcon className="ml-2 h-4 inline-block hover:ml-4" />
                </button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* end trending courses */}
      {/* start about us */}
      <section className="text-gray-600 body-font xl:px-28">
        <div className="container mx-auto flex pb-10 py-10 px-3 md:px-0 lg:py-24 lg:px-5 md:flex-row flex-col-reverse items-center justify-between">
          <div className="mb-10 md:mb-0 flex lg:w-1/2 md:w-1/3 w-5/6">
            <img className="object-cover object-center rounded w-3/4 mx-auto" alt="hero" src="./about.png" />
          </div>
          <div className="md:pl-5 max-w-3xl lg:flex-grow md:w-screen lg:w-1/2 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font text-3xl sm:text-4xl mb-4 font-bold text-gray-900">About us</h1>
            <p className="mb-8 text-md md:text-lg leading-relaxed">
            We are providing a great source for people to learn coding, Our education portal should help them learn by providing them with all the resources on a single platform. Creating a reliable online portal for learning new technologies for students and youngsters especially for them who are in remote areas for free of cost.
              </p>
            <div className="flex justify-center">
              <Link href="/about">
                <a className="text-indigo-500 mb-5 hover:text-blue-900 transform transition rounded-lg text-lg">
                  More About us
                  <ArrowNarrowRightIcon className="ml-2 h-4 inline-block hover:ml-4" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* end about us */}
      <Footer />
    </>
  );
}
