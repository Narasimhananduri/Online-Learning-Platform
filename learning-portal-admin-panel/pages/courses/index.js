



import { useState, useEffect } from "react";
import { SearchIcon, PencilAltIcon, UploadIcon } from "@heroicons/react/solid";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import Head from "next/head";
import AddAssetTypeDialog from "../../components/layouts/createCourses";
import EditAssetTypeDialog from "../../components/layouts/editCourses";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Template from "../../components/layouts/admin";
import { isUserLoggedIn, UserData } from "../../utils/User";
import { useRouter } from "next/router";
import Pagination from "../../components/ui/pagination";
import { PAGINATION_LIMIT } from "../../config/constants";
import ConfirmDialog from "../../components/ui/confirm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Assets() {
  const [addAssetType, setAddAssetType] = useState(false);
  const [editAssetType, setEditAssetType] = useState(false);
  const [editAssetTypeId, setEditAssetTypeId] = useState(false);
  const [deleteAssetType, setDeleteAssetType] = useState(false);
  const [deleteAssetTypeId, setDeleteAssetTypeId] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState();
  const [assetsUpdated, setAssetsUpdated] = useState(true);
  const [assets, setAssets] = useState();



  const [searchkeyword, setSearchKeyword] = useState();
  const [filterkeyword, setFilterKeyword] = useState();



  const [listAssetsMessage, setListAssetsMessage] = useState();
  const router = useRouter();



  const status_colors={

    Active:{ text: "text-white" , background:"bg-green-600"},
    Disabled:{ text: "text-white" , background:"bg-red-600"},
    Pending:{ text: "text-white" , background:"bg-yellow-600"},
    
    }
    




  
  

  const [userdata, setUserData] = useState();


  const [totalRecords, setTotalRecords] = useState();
  const [pagination, setPagination] = useState({
    limit: PAGINATION_LIMIT,
    from: 0,
    to: PAGINATION_LIMIT,
  });

  useEffect(() => {

    




    axios.post(API_URL +"courses/get_courses.php",{
      limit: pagination.limit,
      from: pagination.from,
      to: pagination.to,
keyword:searchkeyword,
state:filterkeyword,


    }).then(function(response) {

// console.log(response);
// setUsers1(response.data?.data);
console.log(response.data?.data)
setUserData(response.data?.data)


      // return;

      if (response.data?.data) {
        setTotalRecords(response.data?.total);
        setAssets(response.data?.data);
      } else {
        setAssets("");
      }


    })












    if (isUserLoggedIn() === false) {
      router.push("/");
    }
   
  }, [searchkeyword, filterkeyword, pagination]);

  // edit asset type button trigger
  function handleEditAssetType(id) {
    setEditAssetType(true);
    setEditAssetTypeId(id);
  }

  // search
  function search(keyword) {
    setSearchAssetKeyword(keyword);
    setAssetsUpdated(keyword);
  }

  // delete asset button trigger
  function handleDeleteAssetType(id) {
    setDeleteAssetType(true);
    setDeleteAssetTypeId(id);
  }

  // delete asset trigger
  function deleteAssetTypeFunc(id) {
    setDeleteAssetType(false);
    axios
      .post(API_URL + "courses/delete_course.php", {
        id: id,
      })
      .then(function (response) {
        if (response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
        }
        if (!response.data?.meta?.error) {
          // notifyOpen(response.data?.meta?.message);
          setAssetsUpdated(new Date().getTime());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <Template page="Chapters">
      <div className="overflow-auto">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <main>
          <div className="h-full ">
            <main className="py-10">
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="mb-0 lg:mb-5 flex flex-col justify-center lg:flex-row lg:justify-between lg:space-x-5">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                 Chapters
                    </h1>
                  </div>
                  <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                      
                      
                      
                      
                    <div className="relative lg:mr-2">





<select
        onChange={(e) => setFilterKeyword(e.target.value)}
        value={filterkeyword}
        id="role"
        name="role"
        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      >
        <option>Select Status</option>

       
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Disabled">Disabled</option>

        
      </select>













    {/* <div className="mt-2 lg:mt-0 ml-0 lg:ml-3 w-full lg:mr-2">{filterStates ? <SimpleSelect options={filterStates} selected={0} changeOption={(option) => setFilterState(option)} /> : ""}</div> */}
  </div>    
                      
                      
                      
                      
                      
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">











                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                          placeholder="Enter Module ,Chapters"
                          type="search"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddAssetType(true)}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      >
                        <PlusIcon className="w-4 h-4 inline-block mr-1" /> 
                        
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full   p-2 ">




                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  
                                 <span class="hidden md:table-cell">Chapters</span> <span class="md:hidden pl-4"> data </span>
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                                >
                                 Module 
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                                >
                                DateTime
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                                >
                                  Status
                                </th>
                                
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                                >
                                  Actions
                                </th>
                              </tr>
                            </thead>



                {userdata ? userdata.map((data) => (


                
                            <tbody class="bg-white divide-y divide-gray-200" key={data?.ID}>
                              <tr>
                                <td class="px-6 py-4 whitespace-nowrap">
                                  <div class="flex items-center">
                                    <div class="ml-4 md:ml-0">
                                      <div class="text-sm  text-gray-500 mb-1 md:mb-0">
                                        <span class="md:hidden mr-3 text-gray-900 font-medium">
                                        Course  :
                                        </span>
                                        <span class=" md:bg-white  rounded-md text-gray-900">
                                        {data?.Title} 
                                        </span>
                                      </div>
                                      <div class="text-sm text-gray-500 lg:hidden md:hidden mb-1 md:mb-0">
                                      <span class="md:hidden mr-3 text-gray-900 font-medium">
                                        Module  :
                                        </span>
                                        <span class=" md:bg-white  rounded-md text-gray-900">
                                      {data?.ModuleTitle}
                                            </span>

                                      

                                      <div class="text-sm text-gray-500 lg:hidden md:hidden mb-1 md:mb-0">
                                      <span class="md:hidden mr-3 text-gray-900 font-medium">
                                        DateTime :
                                        </span>
                                        <span class=" md:bg-white  rounded-md text-gray-900">
                                      {data?.CreatedAt}
                                      </span>
                                      </div>



                                      </div>
                                      <div class="text-sm text-gray-500 lg:hidden md:hidden mb-1 md:mb-0">
                                      <span class="md:hidden mr-3 text-gray-900 font-medium">
                                        Status  :
                                        </span>
                                        <span className={`rounded-lg px-1 ${status_colors[data?.Status].text +" "+ status_colors[data?.Status].background}`}>
                                      {data?.Status}
                                      </span>
                                      </div>


                                      <div class="lg:hidden md:hidden">
                                      <a onClick={() => handleEditAssetType(data?.ID)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2">
                                      <PencilAltIcon className="w-4 h-4 inline-block" />
                                    </a>
                                    
                                    <a onClick={() => handleDeleteAssetType(data?.ID)} className="text-red-600 hover:text-red-900 cursor-pointer p-2">
                                      <TrashIcon className="w-4 h-4 inline-block" />
                                    </a>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell ">
                                  <div class="text-sm text-gray-900">
                                  {data?.ModuleTitle}
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                {data?.CreatedAt}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                  <span className={`rounded-lg px-1 ${status_colors[data?.Status].text +" "+ status_colors[data?.Status].background}`}>
                                  {data?.Status}
                                  </span>
                                </td>


                                

                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                <a onClick={() => handleEditAssetType(data?.ID)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer p-2">
                                      <PencilAltIcon className="w-4 h-4 inline-block" />
                                    </a>
                                    |
                                    <a onClick={() => handleDeleteAssetType(data?.ID)} className="text-red-600 hover:text-red-900 cursor-pointer p-2">
                                      <TrashIcon className="w-4 h-4 inline-block" />
                                    </a> 
                                </td>
                              </tr>
                            </tbody>
                        

                  )) : ''} 

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

                
              </div>
            </main>
          </div>
        </main>
        <AddAssetTypeDialog
          open={addAssetType}
          onChangeOpen={() => setAddAssetType(false)}
          assetAdded={(e) => setAssetsUpdated(e)}
          successMessage={(e) => setAddedSuccess(e)}
        />
        <EditAssetTypeDialog
          id={editAssetTypeId}
          open={editAssetType}
          onChangeOpen={() => setEditAssetType(false)}
          assetTypeUpdated={(e) => setAssetsUpdated(e)}
          successMessage={(e) => setAddedSuccess(e)}
        />
        <ConfirmDialog
          id={deleteAssetTypeId}
          message="You want to delete the asset type, all assets will be deleted with this asset type."
          open={deleteAssetType}
          onClosed={() => setDeleteAssetType(false)}
          onConfirmed={() => deleteAssetTypeFunc(deleteAssetTypeId)}
        />
      </div>
    </Template>
  );
}


