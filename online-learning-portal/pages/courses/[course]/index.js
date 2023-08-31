import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";
import { courseLevels } from "../../../utils/Data";
import Topiclist from "../../../components/layouts/TopicList";
import Feedback from "../../../components/layouts/Feedback";

export default function Topic() {
  const router = useRouter();
  const [serverData, setServerData] = useState();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const course = router.query.course;
  const slug = router.query.slug;
  const [courseTopic, setCourseTopic] = useState(serverData?.data);
  const [courseData, setCourseData] = useState(serverData?.courseDetails);
  const [courseTopics, setCourseTopics] = useState(serverData?.courseTopics);
  const [readingTopic, setReadingTopic] = useState(serverData?.readingTopic);
  const [readingTopics, setReadingTopics] = useState(serverData?.readingTopics);
  const [pageLoading, setPageLoading] = useState(true);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [topicsMenu, setTopicsMenu] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Topic.getInitialProps = async () => {
    return {};
  };
  function convertDataToHtml(code) {
    var convertedHtml = "";
    var blocks = JSON.parse(code).blocks;
    blocks.map((block) => {
      switch (block.type) {
        case "header":
          convertedHtml += `<h${block.data.level}>${block.data.text.trim()}</h${block.data.level}>`;
          break;
        case "embded":
          convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
          break;
        case "paragraph":
          convertedHtml += `<p>${block.data.text}</p>`;
          break;
        case "delimiter":
          convertedHtml += "<hr />";
          break;
        case "rawTool":
          convertedHtml += block.data.html;
          break;
        case "image":
          convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" />`;
          // <br /><em>${block.data.caption}</em>
          break;
        case "code":
          convertedHtml += `<pre>` + block.data.code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + `</pre>`;
          convertedHtml +=
            `<a target="_blank" href="/editor.html?topic=` +
            courseTopic?.ID +
            `&id=` +
            block.id +
            `">
          <span class="text-lg no-underline cursor-pointer bg-help hover:bg-help-dark hover:text-help-light text-help-darker font-bold py-1 px-4 rounded inline-flex items-center">
            Try it on Code Editor
          </span></a>`;
          break;
        case "table":
          convertedHtml += "<table>";
          block.data.content.forEach(function (tr) {
            convertedHtml += "<tr>";
            tr.forEach(function (td) {
              convertedHtml += `<td>${td.replace(/\[\[\[(.+?)\]\]\]/g, function (m, url) {
                return '<img src="' + url + '">';
              })}</li>`;
            });
            convertedHtml += "</tr>";
          });
          convertedHtml += "</table>";
          break;
        case "list":
          convertedHtml += "<ul>";
          block.data.items.forEach(function (li) {
            convertedHtml += `<li>${li}</li>`;
          });
          convertedHtml += "</ul>";
          break;
        default:
          console.log("Unknown block type", block.type);
          break;
      }
    });
    return convertedHtml;
  }
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/courses/" + course);
    }
    if (course && isStudentLoggedIn() === true) {
      axios
        .post(API_URL + "courses/get_topic.php", {
          course: course,
          user_id: StudentData().ID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
            setServerData(response?.data);
            setCourseTopic(response?.data?.data);
            setCourseData(response?.data?.courseDetails);
            setCourseTopics(response?.data?.courseTopics);
            setReadingTopic(response?.data?.readingTopic);
            setReadingTopics(response?.data?.readingTopics);
            // console.log(response?.data?.readingTopic);
            setPageLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (serverData) {
      setPageLoading(false);
    }
  }, [course]);

  if (pageLoading === true) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
        <span class="relative h-20 w-20">
          <span class="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span class="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
        </span>
      </div>
    );
  } else {
    return (
      <>
        <div className="sticky">
          <div>
            <div class="bg-white border-b flex justify-between items-center p-3 py-5 lg:hidden">
              <Link href="/">
                <a>
                  <img className="block lg:hidden h-8 ml-3" src="/logo.png" alt="Workflow" />
                </a>
              </Link>
              <Link href="/courses">
                <a class="ml-28 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span>Back</span>
                </a>
              </Link>
            </div>

            <div class="bg-white border-b flex justify-between items-center p-3 px-5 lg:hidden">
              <a href="#" class="text-md font-bold text-gray-900 rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
                {courseData?.Title}
              </a>
              <div onClick={(e) => setTopicsMenu(true)} className={topicsMenu ? "hidden" : "block px-2 mr-2"}>
                <svg class="h-6 w-5" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
                </svg>
              </div>
              <div onClick={(e) => setTopicsMenu(false)} className={topicsMenu ? "block px-2 mr-2" : "hidden"}>
                <svg className="w-6 h-6" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"></path>
                </svg>
              </div>
            </div>

            <div className="flex">
              <Topiclist readingTopic={readingTopic} readingTopics={readingTopics} courseData={courseData} show={topicsMenu} topics={courseTopics} slug={courseTopic?.Slug} />
              <div className="flex-1 border overflow-y-scroll h-screen justify-center items-center p-10">
                <Link href="/courses">
                  <a class="hidden lg:inline-flex ml-28 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>Back</span>
                  </a>
                </Link>
                <div className="flex justify-center">
                  {courseTopic && (
                    <div>
                      <article class="prose lg:prose-2xl">
                        <h2 className="pt-0 lg:pt-14">{courseTopic?.Title}</h2>
                        <div id="editorjs" dangerouslySetInnerHTML={{ __html: convertDataToHtml(courseTopic.Content) }}></div>
                      </article>
                      <Feedback topic={courseTopic?.ID} student={StudentData().ID} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// export async function getServerSideProps(context) {
//   const course = context.query.course;

//   const response = await axios
//     .post(API_URL + "courses/get_topic.php", {
//       course: course,
//     })
//     .then((response) => JSON.stringify(response.data));
//   if (!response) {
//     return {
//       notFound: true,
//     };
//   }

//   return { props: { props_data: response } };
// }
