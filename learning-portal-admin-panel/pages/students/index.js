import { Fragment, useState, useEffect } from "react";
import { ArrowNarrowLeftIcon, CheckIcon, HomeIcon, PaperClipIcon, QuestionMarkCircleIcon, SearchIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";
import { TrashIcon, PlusIcon, PencilAltIcon } from "@heroicons/react/outline";
import Head from "next/head";
import AddUserDialog from "../../components/layouts/createStudent";
import Enroll from "../../components/layouts/Enroll";
import EditUserDialog from "../../components/layouts/editStudent";
import ConfirmDialog from "../../components/ui/confirm";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Template from "../../components/layouts/admin";
import { isUserLoggedIn, UserData } from "../../utils/User";
import { useRouter } from "next/router";
import SimpleSelect from "../../components/ui/select";
import UploadExcelDialog from "../../components/layouts/importStudents";
import { PAGINATION_LIMIT } from "../../config/constants";

import Pagination from "../../components/ui/pagination";

import Alert from "../../components/ui/alert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Assets() {
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editUserId, setEditUserId] = useState();
  const [deleteUser, setDeleteUser] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [addedSuccess, setAddedSuccess] = useState();
  const [usersUpdated, setUsersUpdated] = useState(true);
  const [users, setUsers] = useState();
  const [users1, setUsers1] = useState();
  const [searchUserKeyword, setSearchUserKeyword] = useState();
  const [listUsersMessage, setListUsersMessage] = useState();
  const [selectedFilters, setSelectedFilters] = useState();
  const [filterRoles, setFilterRoles] = useState();
  const [filterstate, setFilterState] = useState("");
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const router = useRouter();
  const [uploadExcel, setUploadExcel] = useState(false);
  const [myid, setMyId] = useState();

  const [mydata2, setMyData2] = useState();

  const [assets, setAssets] = useState();

  const [filterstate1, setFilterState1] = useState();

  const [filterschool1, setFilterSchool1] = useState();

  const [enroll, setEnroll] = useState(false);

  const [totalRecords, setTotalRecords] = useState();
  const [pagination, setPagination] = useState({
    limit: PAGINATION_LIMIT,
    from: 0,
    to: PAGINATION_LIMIT,
  });

  const status_colors = {
    Active: { text: "text-white", background: "bg-green-600" },
    Disabled: { text: "text-white", background: "bg-red-600" },
    Pending: { text: "text-white", background: "bg-yellow-600" },
  };

  const fetch_filters = () =>
    axios
      .post(API_URL + "students/user_filters.php")
      .then(function (response) {
        if (response.data) {
          let roles = [];
          roles.push({ id: 0, name: "Roles - All" });
          response.data.roles.forEach((option) => {
            roles.push({ id: option.RoleId, name: option.RoleName });
          });
          setFilterRoles(roles);
          setFiltersLoaded(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  useEffect(() => {
    axios
      .post(API_URL + "students/get_students.php", {
        limit: pagination.limit,
        from: pagination.from,
        to: pagination.to,
        keyword: searchUserKeyword,
        state: filterstate,
        mystate: filterstate1,
        myschool: filterschool1,
      })
      .then(function (response) {
        console.log(response);
        setUsers1(response.data?.data);
        setMyData2(response.data?.Schools);
        // return;
        if (response.data?.data) {
          setTotalRecords(response.data?.total);
          setAssets(response.data?.data);
        } else {
          setAssets("");
        }
      });

    if (isUserLoggedIn() === false) {
      router.push("/");
    }
    filtersLoad();
  }, [searchUserKeyword, usersUpdated, filterstate, pagination, filterstate1, filterschool1]);

  const filtersLoad = () => {
    if (filtersLoaded === false) {
      fetch_filters();
    }
  };

  // edit user button trigger
  function handleEditUser(id) {
    setEditUser(true);
    setEditUserId(id);
  }

  // delete asset button trigger
  function handleenroll(id) {
    setEnroll(true);
    setMyId(id);
  }

  function notifyOpen(message) {
    setAddedSuccess(message);
    setShowNotification(true);
  }
  function handleDeleteUser(id) {
    setDeleteUser(true);
    setDeleteUserId(id);
  }

  // delete asset trigger
  function deleteUserFunc(id) {
    setDeleteUser(false);
    axios
      .post(API_URL + "students/delete_student.php", {
        id: id,
      })
      .then(function (response) {
        if (response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
        }
        if (!response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
          setUsersUpdated(new Date().getTime());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Template page="Students">
      <div className=" overflow-auto">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <main>
          <div className="min-h-screen bg-gray-100">
            {/* <Header /> */}
            <main className="py-10">
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex flex-col mb-0 lg:mb-5 justify-center lg:flex-row lg:justify-between lg:space-x-5">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                  </div>
                  <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                      <div className="relative lg:mr-2">
                        <select onChange={(e) => setFilterState(e.target.value)} value={filterstate} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                          <option>Select Status</option>

                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Disabled">Disabled</option>
                        </select>
                      </div>

                      <div className="relative lg:mr-2">
                        <select onChange={(e) => setFilterState1(e.target.value)} value={filterstate1} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                          <option>Select State</option>

                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                        </select>
                      </div>

                      

                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          onChange={(e) => setSearchUserKeyword(e.target.value)}
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                          placeholder="Enter Students name"
                          type="search"
                        />
                      </div>
                      <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                          <button
                            type="button"
                            onClick={() => setUploadExcel(true)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                            {/* <UploadIcon className="w-4 h-4 inline-block mr-1" />  */}
                            Bulk Upload
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddUser(true)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                        <PlusIcon className="w-4 h-4 inline-block mr-1" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span class="md:table-cell hidden">Name/Email</span> <span class="md:hidden"> Data</span>
                              </th>

                              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mobile
                              </th>
                              
                              <th scope="col" className=" hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className=" hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Progress
                              </th>
                              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {users1 ? (
                              users1.map((person) => (
                                <tr key={person?.ID}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className=" space-y-2 md:space-y-0">
                                        <div className="flex">
                                          <div>
                                            <span class="md:hidden text-sm text-gray-900 font-medium">Full Name :</span>
                                            <div className="text-sm text-gray-900 ml-1">{person?.FullName}</div>
                                            <span class="md:hidden text-sm text-gray-900 font-medium">Email :</span>
                                            <div className="text-sm text-gray-900 ml-1">{person?.Email}</div>
                                          </div>
                                        </div>

                                       
                                        <div className="flex">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">MobileNo :</span>
                                          <div className="md:hidden text-sm text-gray-900 ml-1">{person?.Mobile}</div>
                                        </div>
                                        

                                        

                                        <div className="flex ">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">Progress :</span>
                                          <div className="md:hidden text-sm  text-gray-900 ml-1">
                                            <button
                                              type="button"
                                              class="inline-flex justify-center items-center space-x-2 rounded border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200">
                                              View
                                            </button>
                                          </div>
                                        </div>

                                        <div className="flex ">
                                          <span className="md:hidden text-sm text-gray-900 font-medium">Status :</span>
                                          <div className="md:hidden text-sm  text-gray-900 ml-1">
                                            <span className={`rounded-lg px-1 ${status_colors[person?.Status].text + " " + status_colors[person?.Status].background}`}>{person?.Status}</span>
                                          </div>
                                        </div>

                                        <div className="flex md:hidden">
                                          <a onClick={() => handleEditUser(person?.ID)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2">
                                            <PencilAltIcon className="w-4 h-4 inline-block" />
                                          </a>

                                          <a onClick={() => handleDeleteUser(person?.ID)} className="text-red-600 hover:text-red-900 cursor-pointer p-2">
                                            <TrashIcon className="w-4 h-4 inline-block" />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  {/* <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">{person?.Email}</div>
                                  </td> */}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{person?.Mobile}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    <span className={`rounded-lg px-1 ${status_colors[person?.Status].text + " " + status_colors[person?.Status].background}`}>{person?.Status}</span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    <a onClick={() => handleenroll(person?.ID)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2">
                                      <button
                                        type="button"
                                        class="inline-flex justify-center items-center space-x-2 rounded border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm border-indigo-200 bg-indigo-200 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-300 hover:border-indigo-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-200 active:border-indigo-200">
                                        View
                                      </button>
                                    </a>
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <a onClick={() => handleEditUser(person?.ID)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2">
                                      <PencilAltIcon className="w-4 h-4 inline-block" />
                                    </a>
                                    |
                                    <a onClick={() => handleDeleteUser(person?.ID)} className="text-red-600 hover:text-red-900 cursor-pointer p-2">
                                      <TrashIcon className="w-4 h-4 inline-block" />
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center py-4 w-full">
                                  No records found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {totalRecords ? <Pagination total={totalRecords} pagination={pagination} pageChanged={(page) => setPagination(page)} /> : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
        <UploadExcelDialog open={uploadExcel} onChangeOpen={() => setUploadExcel(false)} excelUploaded={(e) => setStudentsUpdated(e)} successMessage={(e) => notifyOpen(e)} />
        <Enroll id={myid} open={enroll} onChangeOpen={() => setEnroll(false)} />
        <AddUserDialog open={addUser} onChangeOpen={() => setAddUser(false)} userAdded={(e) => setUsersUpdated(e)} successMessage={(e) => setAddedSuccess(e)} />
        <EditUserDialog id={editUserId} open={editUser} onChangeOpen={() => setEditUser(false)} userUpdated={(e) => setUsersUpdated(e)} successMessage={(e) => setAddedSuccess(e)} />
        <ConfirmDialog id={deleteUserId} message="You want to delete the user" open={deleteUser} onClosed={() => setDeleteUser(false)} onConfirmed={() => deleteUserFunc(deleteUserId)} />
      </div>
    </Template>
  );
}
