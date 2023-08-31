import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { districtsData, countriesData, statesData } from "../../utils/Data";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { rolesData } from "../../utils/Data";

export default function AddUserDialog(props) {
  const [open, setOpen] = useState(false);

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const [school, setSchool] = useState("");
  const [class1, setClass1] = useState("");

  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  const [gender, setGender] = useState("");

  const [addUserMessage, setAddUserMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  const [stateKey, setStateKey] = useState(0);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddUserMessage("");
    setFullName("");
    setEmail("");
    setMobile("");
    setCountry("");
    setState("");
    setDistrict("");
setGender("");
    setCity("");
    setArea("");
    setAddress("");
    setSchool("");
    setClass1("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function submitLocation(e) {
    e.preventDefault();
    // if (firstName.trim() === "") {
    //   setAddUserMessage({ type: "error", message: "Please enter first name", icon: "error" });
    // } else {
    axios
      .post(API_URL + "students/add_student.php", {
        full_name: fullname,
        gender:gender,
        email: email,
        mobile: mobile,

        country: country,
        state: state,
        district: district,

        city: city,
        area: area,
        address: address,

        school: school,
        class1: class1,
      })
      .then(function (response) {
        if (response.data.meta.error === true) {
          setAddUserMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (response.data.meta.error === false) {
          setAddUserMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "loading",
          });
          props.userAdded(response.data?.id);
          closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
  } 

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40"
        open={open}
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
                            Add Student Details
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Get started by filling in the information below to
                            add new Student.
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

                    {/* Divider container */}
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0">
                      {addUserMessage.message ? (
                        <Alert
                          type={addUserMessage.type}
                          message={addUserMessage.message}
                          icon={addUserMessage.icon}
                        />
                      ) : (
                        ""
                      )}
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Full Name
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullname}
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>




{/* Project name */}
<div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Gender
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                       
                            {/* {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))} */}
                          </select>
                        </div>
                      
                      </div>











                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Email
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Mobile
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            type="text"
                            name="mobile"
                            id="mobile"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Email
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                        </div>
                      </div> */}
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Country
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Country</option>

                            {countriesData
                              ? countriesData.map((country) => {
                                  return (
                                    <option value={country.code3}>
                                      {country.name}
                                    </option>
                                  );
                                })
                              : ""}
                            {/* <option value="IND">India</option>
                            <option value="China">China</option> */}

                            {/* {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                      {/* Project name */}
                      {country && country === "IND" ? (
                        <>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                            <div>
                              <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                State
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <select
                                onChange={(e) => {
                                  setState(districtsData[e.target.value].state),
                                    setStateKey(e.target.value);
                                }}
                                value={state}
                                id="role"
                                name="role"
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              >
                                <option>Select State</option>

                                {districtsData
                                  ? districtsData.map((state, key) => {
                                      return (
                                        <option value={key}>
                                          {state.state}
                                        </option>
                                      );
                                    })
                                  : ""}
                              </select>
                            </div>
                          </div>





                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                            <div>
                              <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                District
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <select
                                onChange={(e) => setDistrict(e.target.value)}
                                value={district}
                                id="role"
                                name="role"
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              >
                                <option>Select District</option>

                                {stateKey
                                  ? districtsData[stateKey].districts.map(
                                      (district) => {
                                        return <option>{district}</option>;
                                      }
                                    )
                                  : ""}
                              </select>
                            </div>
                          </div>






                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                            <div>
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                City
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>





                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                            <div>
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Area
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                onChange={(e) => setArea(e.target.value)}
                                value={area}
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {country && country !== "IND" ? (
                        <>
                          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                            <div>
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                              >
                                Address
                              </label>
                            </div>
                            <div className="sm:col-span-2">
                              <input
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}



                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            School
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setSchool(e.target.value)}
                            value={school}
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Class
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setClass1(e.target.value)}
                            value={class1}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Class</option>
                            <option value="1">Class 1</option>
                            <option value="2">Class 2</option>
                            <option value="3">Class 3</option>
                            <option value="4">Class 4</option>
                            <option value="5">Class 5</option>
                            <option value="6">Class 6</option>
                            <option value="7">Class 7</option>
                            <option value="8">Class 8</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
                            {/* {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))} */}
                          </select>
                        </div>
                      </div>
                    

                    
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Password
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div> */}
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Role
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => setRole(e.target.value)} value={role} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select State</option>
                            {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                    <div className="space-x-3 flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => closed()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => submitLocation(e)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create
                      </button>
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
}





