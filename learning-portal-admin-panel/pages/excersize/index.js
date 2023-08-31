







import { Fragment, useState, useEffect } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  EyeIcon,
  MenuIcon,
  UploadIcon,
  XIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
// import UploadImageDialog from "../../components/layouts/uploadImages";
// import UploadExcelDialog from "../../components/layouts/importAssets";
import AddAssetDialog from "../../components/layouts/createExercise";
import EditAssetDialog from "../../components/layouts/editExercise";
// import OpenImagesDialog from "../../components/layouts/viewImages";
import ConfirmDialog from "../../components/ui/confirm";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Template from "../../components/layouts/admin";
import { statesData, managementStatusData } from "../../utils/Data";
import SimpleSelect from "../../components/ui/select";
import Notification from "../../components/ui/notification";
import { setupCache } from "axios-cache-adapter";
import { isUserLoggedIn, UserData } from "../../utils/User";
import { useRouter } from "next/router";
import Pagination from "../../components/ui/pagination";
import { PAGINATION_LIMIT } from "../../config/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Assets() {
  const [updateButtons, setUpdateButtons] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState();
  const [addAsset, setAddAsset] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [uploadImageId, setUploadImageId] = useState();
  const [uploadExcel, setUploadExcel] = useState(false);
  const [uploadExcelId, setUploadExcelId] = useState();
  const [viewImage, setViewImage] = useState(false);
  const [viewImageId, setViewImageId] = useState();
  const [editAsset, setEditAsset] = useState(false);
  const [editAssetId, setEditAssetId] = useState();
  const [deleteAsset, setDeleteAsset] = useState(false);
  const [deleteAssetId, setDeleteAssetId] = useState();
  const [addedSuccess, setAddedSuccess] = useState();
  const [assetsUpdated, setAssetsUpdated] = useState(true);
  const [assets, setAssets] = useState();
  const [images, setImages] = useState();
  const [searchAssetKeyword, setSearchAssetKeyword] = useState();
  const [listAssetsMessage, setListAssetsMessage] = useState();
  const [updatedAssetsMessage, setUpdatedAssetsMessage] = useState();
  const [selectedFilters, setSelectedFilters] = useState();
  const [filterStates, setFilterStates] = useState();
  const [filterLocations, setFilterLocations] = useState();
  const [filterAssetTypes, setFilterAssetTypes] = useState();
  const [filterStatuses, setFilterStatuses] = useState();
  const [filterState, setFilterState] = useState();
  const [filterLocation, setFilterLocation] = useState();
  const [filterAssetType, setFilterAssetType] = useState();
  const [filterStatus, setFilterStatus] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [users1,setUsers1]=useState();
  const [users2,setUsers2]=useState();

  const [myfilter,setMyFilter]=useState();
const [mysearch,setMySearch]=useState();
  const [coursefilter,setCourseFilter]=useState();

  const [totalRecords, setTotalRecords] = useState();
  const [pagination, setPagination] = useState({
    limit: PAGINATION_LIMIT,
    from: 0,
    to: PAGINATION_LIMIT,
  });
  const router = useRouter();





  const status_colors={

    Active:{ text: "text-white" , background:"bg-green-600"},
    Disabled:{ text: "text-white" , background:"bg-red-600"},
    Pending:{ text: "text-white" , background:"bg-yellow-600"},
    
    }

  

  useEffect(() => {





    axios.post(API_URL + "exercise/get_excersize.php",{
      mysearch:mysearch,
      coursefilter:coursefilter,
      state:myfilter,
    }).then(function(response) {

console.log(response);
setUsers1(response.data?.data);


    

    })



    axios.post(API_URL + "courses/get_courses.php").then(function(response) {

console.log(response);
setUsers2(response.data?.data);


    

    })


 



    if (isUserLoggedIn() === false) {
      router.push("/");
    }
   
  }, [
    searchAssetKeyword,
    mysearch,
    coursefilter,
    myfilter,
    assetsUpdated,
    filterState,
    filterLocation,
    filterAssetType,
    filterStatus,
    pagination,
  ]);
 

  // edit asset button trigger
  function handleEditAsset(id) {
    setEditAsset(true);
    setEditAssetId(id);
  }

  // delete asset button trigger
  function handleDeleteAsset(id) {
    setDeleteAsset(true);
    setDeleteAssetId(id);
  }

  // delete asset trigger
  function deleteAssetFunc(id) {
    setDeleteAsset(false);
    axios
      .post(API_URL + "exercise/delete_excersize.php", {
        id: id,
      })
      .then(function (response) {
        if (response.data?.meta?.error) {
          notifyOpen(response.data?.meta?.message);
        }
        if (!response.data?.meta?.error) {
          notifyOpen(response.data?.meta?.message);
          setAssetsUpdated(new Date().getTime());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 
  return (
    <Template page="Exercises">
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
                <div className="flex flex-col justify-center lg:flex-row lg:justify-between lg:space-x-5">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Excersize</h1>
                  </div>
                  {addedSuccess ? (
                    <Notification
                      show={showNotification}
                      type="success"
                      message={addedSuccess}
                      icon="success"
                    />
                  ) : (
                    ""
                  )}
                  <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                     









                    <select
      onChange={(e) => setMyFilter(e.target.value)}
      value={myfilter}
      id="role"
      name="role"
      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
    >
      <option>Select Status</option>

     
      <option value="Active">Active</option>
      <option value="Pending">Pending</option>
      <option value="Disabled">Disabled</option>

      
    </select>


    <select
      onChange={(e) => setCourseFilter(e.target.value)}
      value={coursefilter}
      id="role"
      name="role"
      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
    >
      <option>Select Course</option>

      
      {users2 ? (

users2.map((data) => (

  <option value={data.Title}>{data.Title}</option>


))):""}

      
    </select>



    <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
   
                          
                          <input
                            id="search"
                            onChange={(e) => setMySearch(e.target.value)}
                            name="search"
                            className="block w-full md:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                            placeholder="Enter Question Type"
                            type="search"
                          />
                  </div>      











                      <button
                        type="button"
                        onClick={() => setAddAsset(true)}
                        className="inline-flex items-center justify-center px-4 py-2  border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        <PlusIcon className="w-4 h-4 inline-block mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-0"> */}
                <div className="mb-5">
                  <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-6 md:flex-row md:space-x-3">
                    <div className="lg:flex-1 lg:flex items-center justify-center lg:justify-start">
                      <div className="w-full lg:w-1/5">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        
                      </div>




                   



















                    
                    </div>
                  </div>
                </div>
                <div
                  id="update_buttons"
                  className={updateButtons ? "" : "hidden"}
                >
                  <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-0">
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                      <span className="p-2">Update:</span>
                      <button
                        type="button"
                        onClick={() => updateAsset(1)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        Yet to be Allocated
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAsset(2)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        Allocated
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAsset(3)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        Installation Completed
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAsset(4)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        In Use
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAsset(5)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        Repair
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAsset(6)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        Damaged
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      {/* overflow-hidden */}
                      <div className="shadow border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                          
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                               
                                <span class="md:table-cell hidden">
                                  Chapter
                                </span>{" "}
                               
                              </th>
                              <th
                                scope="col"
                                className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Question Title
                              </th>
                              <th
                                scope="col"
                                className=" hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Question Type
                              </th>
                              <th
                                scope="col"
                                className="hidden md:table-cell  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              
                              <th
                                scope="col"
                                className=" hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {users1 ? (
                              users1.map((person) => (
                                <tr key={person?.ID}>
                                
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex ">
                                      <div className="ml-4 space-y-2 md:space-y-0">
                                        <div className="flex md:items-center mr-2 md:mr-0 md:justify-between">




                                          

                                          <div className="inline-block ml-3 md:ml-0">
                                            <span class="text-sm md:hidden font-medium">
                                              Course :
                                            </span>
                                            <div className="text-sm  text-gray-900 inline-block ml-1 md:ml-0">
                                            
                                              {person?.Title}
                                            </div>
                                          </div>

                                         
                                        </div>

                                        <div className="flex  md:hidden ml-7 flex-1">
                                          <span class="text-sm md:hidden font-medium">
                                            Question Title :
                                          </span>
                                          <div className="text-sm    md:hidden ml-1">
                                            {person?.QTitle}  
                                          </div>
                                        </div>
                                        <div className="flex  md:hidden ml-7 flex-1">
                                          <span class="text-sm md:hidden font-medium">
                                            Question Type:
                                          </span>
                                          <div className="text-sm  text-gray-900 md:hidden ml-1 ">
                                            {person?.TypeOfQuestion}
                                          </div>
                                        </div>

                                        <div class="flex  md:hidden ml-7 flex-1">
                                          <span class="text-sm md:hidden font-medium">
                                            Status :
                                          </span>
                                             <div className="md:hidden text-sm  text-gray-900 ml-1"><span className={`rounded-lg px-1 ${status_colors[person?.Status].text +" "+ status_colors[person?.Status].background}`}>{person?.Status}</span></div>

                                        </div>

                                   

                                        <div class="flex  md:hidden ml-7 flex-1 ">
                                          <a
                                            onClick={() =>
                                              handleEditAsset(person?.ID)
                                            }
                                            className=" md:hidden text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                          >
                                            <PencilAltIcon className="w-4 h-4 inline-block" />
                                          </a>{" "}
                                          
                                          <a
                                            onClick={() =>
                                              handleDeleteAsset(person?.ID)
                                            }
                                            className=" md:hidden  text-red-600 hover:text-red-900 cursor-pointer p-2"
                                          >
                                            <TrashIcon className="w-4 h-4 inline-block" />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-sm text-gray-900">
                                    {person?.QTitle} 
                                    </div>
                                    {/* <div className="text-sm text-gray-500">City: {person?.email}</div> */}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                  {person?.TypeOfQuestion}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                  

                                  <span className={`rounded-lg px-1 ${status_colors[person?.Status].text +" "+ status_colors[person?.Status].background}`}>{person?.Status}</span>
                                  
                                  </td>
                               
                                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                    <a
                                      onClick={() =>
                                        handleEditAsset(person?.ID)
                                      }
                                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2"
                                    >
                                      <PencilAltIcon className="w-4 h-4 inline-block" />
                                    </a>{" "}
                                    |
                                    <a
                                      onClick={() =>
                                        handleDeleteAsset(person?.ID)
                                      }
                                      className="text-red-600 hover:text-red-900 cursor-pointer p-2"
                                    >
                                      <TrashIcon className="w-4 h-4 inline-block" />
                                    </a>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="text-center py-4 w-full"
                                >
                                  No records found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        {totalRecords ? (
                          <Pagination
                            total={totalRecords}
                            pagination={pagination}
                            pageChanged={(page) => setPagination(page)}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
       
        <ConfirmDialog
          id={deleteAssetId}
          message="You want to delete the asset"
          open={deleteAsset}
          onClosed={() => setDeleteAsset(false)}
          onConfirmed={() => deleteAssetFunc(deleteAssetId)}
        />
     
        <AddAssetDialog
          locations={filterLocations}
          statuses={filterStatuses}
          assetTypes={filterAssetTypes}
          open={addAsset}
          onChangeOpen={() => setAddAsset(false)}
          assetAdded={(e) => setAssetsUpdated(e)}
          successMessage={(e) => notifyOpen(e)}
        />
        <EditAssetDialog
          id={editAssetId}
          locations={filterLocations}
          statuses={filterStatuses}
          assetTypes={filterAssetTypes}
          open={editAsset}
          onChangeOpen={() => setEditAsset(false)}
          assetUpdated={(e) => setAssetsUpdated(e)}
          successMessage={(e) => notifyOpen(e)}
        />
        {/* <Footer /> */}
      </div>
    </Template>
  );
}

