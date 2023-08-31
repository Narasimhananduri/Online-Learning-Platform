import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Template from "../components/layouts/admin";
import { managementStatusData } from "../utils/Data";
import SimpleSelect from "../components/ui/select";
import { isUserLoggedIn, UserData } from "../utils/User";
import { useRouter } from "next/router";
import { Pie } from "react-chartjs-2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Assets({ locations, initialData }) {
  const [filterLocations, setFilterLocations] = useState();
  const [filterLocation, setFilterLocation] = useState();
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [statusLabels, setStatusLabels] = useState();
  const [data, setData] = useState();
  const router = useRouter();

  const [students, setStudents] = useState();
  const [astudents, setAStudents] = useState();
  const [dstudents, setDStudents] = useState();
  const [courses, setCourses] = useState();
  const [quizz, setQuizz] = useState();
  const [male, setMale] = useState();
  const [female, setFemale] = useState();

  const [certificate, setCertificate] = useState();
  const [oneModules, setOneModules] = useState();

  useEffect(() => {
    if (isUserLoggedIn() === false || UserData.RoleId === 1) {
      router.push("/");
    }
    // if (!filtersLoaded) {
    //    getInit();
    //    locationChanged("");
    // }
    // if (filterLocations) {
    //   setFiltersLoaded(true);
    // }

    axios.post(API_URL + "dashboard/dashboard.php").then(function (response) {
      console.log(response);
      setStudents(response.data?.total_students);
      setAStudents(response.data?.total_astudents);
      setDStudents(response.data?.total_dstudents);
      setCourses(response.data?.total_courses);
      setQuizz(response.data?.total_quizzes);

      setMale(response.data?.total_male);
      setFemale(response.data?.total_female);

      setCertificate(response.data?.total_certificate);
      setOneModules(response.data?.one_modules);

      // return;
    });
  }, []);

  // async function getInit() {
  //   const filters = await axios.post(API_URL + "assets/assigned_filters.php");
  //   let locations = [];
  //   if (filters) {
  //     locations.push({ id: 0, name: "Location - All" });
  //     filters.data.locations.forEach((option) => {
  //       locations.push({ id: option.LocationId, name: option.LocationName });
  //     });
  //   }
  //   setFilterLocations(locations);
  // }

  // const locationChanged = async (option) => {
  //   // setFilterLocation(option);
  //   const counts = await axios.post(API_URL + "represent_dashboard.php", {
  //     limit: 1000,
  //     from: 0,
  //     to: 1000,
  //     location: option,
  //     user_id: 1,
  //   });
  //   const values_array = [];
  //   for (var key in counts.data.data[0]) {
  //     if (key < 7) {
  //       values_array.push(counts.data.data[0][key]);
  //     }
  //   }
  //   const statuses = [];
  //   for (var status in managementStatusData) {
  //     statuses.push(managementStatusData[status]);
  //   }
  //   const initData = {
  //     labels: statuses,
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: values_array,
  //         backgroundColor: [
  //           "rgba(255, 99, 132)",
  //           "rgba(54, 162, 235)",
  //           "rgba(255, 206, 86)",
  //           "rgba(75, 192, 192)",
  //           "rgba(153, 102, 255)",
  //           "rgba(255, 159, 64)",
  //         ],
  //       },
  //     ],
  //   };
  //   setData(initData);
  // };
  return (
    <Template page="Home">
      <div className=" overflow-auto">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <main>
          {/* <div className="min-h-screen bg-gray-100">
            <main className="py-10"> */}
          {/* <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex items-center space-x-5">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  </div>
                </div>
              </div> */}

          <section class="py-5 bg-white">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5">Dashboard:</h2>
              {/* <p class="mt-2 text-lg text-center text-gray-600">Check out our list of awesome features below.</p> */}
              <div class="grid grid-cols-4 gap-8 mt-5 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                <div class="relative flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl border-2 lg:border-0 border-gray-300 lg:border-gray-200">
                  {/* <div class="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"></path>
                      <circle cx="6" cy="14" r="3"></circle>
                      <path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"></path>
                    </svg>
                  </div> */}
                  <h4 class="text-xl font-medium text-gray-700">Number of Students</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{students}</p>
                  {/* <div className="transition duration-150 hover:text-blue-700">
                  <a><Link href="/students">Click Here..</Link></a>
                  </div> */}
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl border-2 lg:border-0 border-gray-300 lg:border-gray-200">
                  {/* <div class="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M18 8a3 3 0 0 1 0 6"></path>
                      <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5"></path>
                      <path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8"></path>
                    </svg>
                  </div> */}
                  <h4 class="text-xl font-medium text-gray-700">Number of Male Students</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{male}</p>
                  {/* <div className="transition duration-150 hover:text-blue-700">
                  <a><Link href="/students">click here..</Link></a>
                  </div> */}
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl border-2 lg:border-0 border-gray-300 lg:border-gray-200">
                  {/* <div class="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
                      <line x1="12" y1="12" x2="20" y2="7.5"></line>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <line x1="12" y1="12" x2="4" y2="7.5"></line>
                      <line x1="16" y1="5.25" x2="8" y2="9.75"></line>
                    </svg>
                  </div> */}
                  <h4 class="text-xl font-medium text-gray-700">Number of Female Students</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{female}</p>
                  {/* <div className="transition duration-150 hover:text-blue-700">
                  <a><Link href="/students">click here..</Link></a>
                  </div> */}
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl border-2 lg:border-0 border-gray-300 lg:border-gray-200">
                  {/* <div class="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M8 9l3 3l-3 3"></path>
                      <line x1="13" y1="15" x2="16" y2="15"></line>
                      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    </svg>
                  </div> */}
                  <h4 class="text-xl font-medium text-gray-700">Number of Chapters</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{courses}</p>
                  {/* <div className="transition duration-150 hover:text-blue-700">
                  <a><Link href="/courses">click here..</Link></a>
                  </div> */}
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl border-2 lg:border-0 border-gray-300 lg:border-gray-200">
                  {/* <div class="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="9.5" y1="11" x2="9.51" y2="11"></line>
                      <line x1="14.5" y1="11" x2="14.51" y2="11"></line>
                      <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
                      <path d="M7 5h1v-2h8v2h1a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3v1h-10v-1a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3"></path>
                    </svg>
                  </div> */}
                  <h4 class="text-xl font-medium text-gray-700">Number of Assessments</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{quizz}</p>
                  {/* <div className="transition duration-150 hover:text-blue-700">
                  <a><Link href="/quiz">click here..</Link></a>
                  </div> */}
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl border-2 lg:border-0 border-gray-300 lg:border-gray-200">
                  {/* <div class="p-3 text-white bg-blue-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="9.5" y1="11" x2="9.51" y2="11"></line>
                      <line x1="14.5" y1="11" x2="14.51" y2="11"></line>
                      <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
                      <path d="M7 5h1v-2h8v2h1a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3v1h-10v-1a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3"></path>
                    </svg>
                  </div> */}
                  <h4 class="text-xl font-medium text-gray-700">
                    Number of Certifications
                    <br />
                  </h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{certificate}</p>
                  {/* <div className="transition duration-150 hover:text-blue-700">
                  <a><Link href="/certificate">click here..</Link></a>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
          <section class="py-5 bg-white">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5 px-4 lg:px-0">Basic Coding Summary (Completed Students):</h2>
              <div class="grid grid-cols-1 gap-8 mt-5  lg:grid-cols-1 sm:px-8 xl:px-0">
                <div class="lg:flex items-center justify-evenly px-2 py-8 lg:bg-gray-200 bg-white sm:rounded-xl space-y-1 lg:space-y-0">
                  {oneModules
                    ? oneModules.map((module, key) => (
                        <div key={module?.ID} class="flex flex-col items-center justify-center px-2 py-8 border-2 border-gray-300 lg:border-gray-200 bg-gray-100 lg:bg-gray-200">
                          <h4 class="text-xl font-medium text-gray-700 text-center mb-1">Module {key + 1}</h4>
                          <p class="font-bold text-3xl text-center text-gray-900">
                            {key === 0 ? module?.Students : key === 1 ? module?.Students : key === 2 ? module?.Students : key === 3 ? module?.Students : key === 4 ? module?.Students : ""}
                          </p>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Template>
  );
}
