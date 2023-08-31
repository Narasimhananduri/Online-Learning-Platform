import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Alert from "../ui/alert";
import Notification from "../ui/notification";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { rolesData } from "../../utils/Data";
import { districtsData, countriesData, statesData } from "../../utils/Data";

export default function EditUserDialog(props) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(props.id);

  // const [fullname, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");

  // const [country, setCountry] = useState("");
  // const [state, setState] = useState("");
  // const [district, setDistrict] = useState("");

  // const [city, setCity] = useState("");
  // const [area, setArea] = useState("");
  // const [address, setAddress] = useState("");

  // const [school, setSchool] = useState("");
  // const [class1, setClass1] = useState("");

  const [status, setStatus] = useState("");

  // const [gender, setGender] = useState("");
  // const [password, setPassword] = useState("");

  const [schoolname, setSchoolName] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const [coordinator, setCoordinator] = useState("");

  const [addUserMessage, setAddUserMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  const [stateKey, setStateKey] = useState(0);

  useEffect(() => {
    setOpen(props.open);
    if (props.open === true) {
      axios
        .post(API_URL + "schools/get_schools_fields.php", {
          edit_user_id: props.id,
        })
        .then(function (response) {
          if (response.data?.meta?.error === true) {
            setAddUserMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (response.data?.meta.error === false) {
            setSchoolName(response.data?.data?.SchoolName ?? "");

            setStatus(response.data?.data?.Status ?? "");

            setState(response.data?.data?.State ?? "");
            setDistrict(response.data?.data?.District ?? "");
            setCity(response.data?.data?.City ?? "");
            setArea(response.data?.data?.Area ?? "");
            setCoordinator(response.data?.data?.Coordinator ?? "");

            setUserId(response.data?.data?.UserId ?? "");
            setStateKey(Object.keys(districtsData).find(key => districtsData[key].state === response.data?.data?.State));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setUserId(props.id);
  }, [props.open, props.id]);

  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddUserMessage("");
    setUserId("");

    setSchoolName("");

    setState("");
    setDistrict("");

    setCity("");
    setArea("");

    // setRole("");

    setStatus("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function submitLocation(e) {
    e.preventDefault();
    // if (fullname.trim() === "") {
    //   setAddUserMessage({ type: "error", message: "Please enter first name", icon: "error" });
    // } else {
    console.log(userId);
    axios
      .post(API_URL + "schools/edit_schools.php", {
        edit_user_id: props.id,
        school: schoolname,

        state: state,
        district: district,
        city: city,

        area: area,
        coordinator: coordinator,
        status: status,
        // role: role,
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
          props.userUpdated(new Date().getTime());
          closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40" open={open} onClose={closed}>
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
              leaveTo="translate-x-full">
              <div className="w-screen max-w-2xl">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Edit School Details</Dialog.Title>
                          <p className="text-sm text-gray-500">Get started by filling in the information below to Edit School Details.</p>
                        </div>
                        <div className="h-7 flex items-center">
                          <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => closed()}>
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Divider container */}
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0">
                      {addUserMessage.message ? <Alert type={addUserMessage.type} message={addUserMessage.message} icon={addUserMessage.icon} /> : ""}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            School
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setSchoolName(e.target.value)}
                            value={schoolname}
                            type="text"
                            name="schoolname"
                            id="schoolname"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            State
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => {
                              setState(districtsData[e.target.value].state), setStateKey(e.target.value);
                            }}

                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select State</option>

                            {districtsData
                              ? districtsData.map((state_arr, key) => {
                                  return <option value={key} selected={state_arr.state==state?true:false}>{state_arr.state}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            District
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => setDistrict(e.target.value)} value={district} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select District</option>
                            {stateKey
                              ? districtsData[stateKey].districts.map((dist) => {
                                  return <option value={dist} selected={district==district?true:false} >{dist}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            City
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input onChange={(e) => setCity(e.target.value)} value={city} type="text" name="first_name" id="first_name" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                        </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Area
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input onChange={(e) => setArea(e.target.value)} value={area} type="text" name="first_name" id="first_name" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
                        </div>
                      </div>

                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Class
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setClass1(e.target.value)}
                            value={class1}
                            placeholder="Leave empty for previous password"
                            type="text"
                            name="class1"
                            id="class1"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div> */}

                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
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
                           
                          </select>
                        </div>
                      </div> */}

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Status
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => setStatus(e.target.value)} value={status} id="state" name="state" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select Course Level</option>
                            <option value="Active">Active</option>

                            <option value="Disabled">Disabled</option>
                            {/* {Object.entries(statesData).map(([key, value]) => (<option key={key} value={key}>{value}</option>)) } */}
                          </select>
                        </div>
                      </div>

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
                        onClick={() => closed()}>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => submitLocation(e)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Update
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
