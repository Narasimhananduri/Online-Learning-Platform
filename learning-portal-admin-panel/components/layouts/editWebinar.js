import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { statesData } from "../../utils/Data";

export default function EditLocationDialog(props) {
  const [open, setOpen] = useState(false);
  const [locationId, setLocationId] = useState(props.id);
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  const [courseid, setCourseId] = useState(props.id);
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const [link, setLink] = useState("");
  // const [trainer, setTrainer] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [speaker, setSpeaker] = useState("");




  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState("");
  const [class1, setClass1] = useState("");







  const [status, setStatus] = useState("");
  const [myimage, setMyImage] = useState("");

  const [addLocationMessage, setAddLocationMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  useEffect(() => {
    setOpen(props.open);
    if (props.open === true) {



      axios
      .post(API_URL + "trainer/get_schools.php", {})
      .then(function (response) {
        if (response.data?.meta?.error === true) {
          
        }
        if (response.data?.meta.error === false) {
          setSchools(response.data?.data ?? "");
        }
      })
      .catch(function (error) {
        console.log(error);
      });





      axios
        .post(API_URL + "webinar/get_webinar_fields.php", {
          id: props.id,
        })
        .then(function (response) {
          if (response.data?.meta?.error === true) {
            setAddLocationMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            }); 
          }
          if (response.data?.meta.error === false) {
            // setLevel(response.data?.data?.CourseLevelID ?? "");
            setTitle(response.data?.data?.WebinarTitle ?? "");
            setDescription(response.data?.data?.WebinarDescription ?? "");

            setLink(response.data?.data?.WebinarLink ?? "");
            setDate(response.data?.data?.Date ?? "");
            setStartTime(response.data?.data?.StartTime ?? "");
            setEndTime(response.data?.data?.EndTime ?? "");
            setSpeaker(response.data?.data?.Speakers ?? "");
            
            setSchool(response.data?.data?.Schools ?? "");
            setClass1(response.data?.data?.Class ?? "")

            setStatus(response.data?.data?.Status ?? "");
            setMyImage(response.data?.data?.Image ?? "");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [props.open, props.id]);
  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddLocationMessage("");
    
    setTitle("");
    setDescription("");
setLink("");
setDate("");
setStartTime("");
setEndTime("");
setSpeaker("");

setClass1("");
setSchool("");


    setStatus("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function submitLocation(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("course_id", props.id);
    if (myimage) {
      formData.append("file", myimage);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    // formData.append("trainer", trainer);
    formData.append("date", date);
    formData.append("starttime", starttime);
    formData.append("endtime", endtime);
   
    formData.append("speaker", speaker);


    formData.append("school", school);
    formData.append("class1", class1);

    formData.append("status", status);
    // if (locationName.trim() === "") {
    //   setAddLocationMessage({ type: "error", message: "Please enter location name", icon: "error" });
    // } else {
    axios
      .post(API_URL + "webinar/edit_webinar.php", formData, config)
      .then(function (response) {
        if (response.data.meta.error === true) {
          setAddLocationMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (response.data.meta.error === false) {
          setAddLocationMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "loading",
          });
          props.locationUpdated(new Date().getTime());
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
                            Edit Webinar
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Get started by filling in the information below to
                            Edit Webinar.
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
                      {addLocationMessage.message ? (
                        <Alert
                          type={addLocationMessage.type}
                          message={addLocationMessage.message}
                          icon={addLocationMessage.icon}
                        />
                      ) : (
                        ""
                      )}

                     







  {/* Project name */}
  <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Webinar Title
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            name="location_name"
                            id="location_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Webinar Description
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            name="address"
                            id="address"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md h-36"
                          >
                            {description}
                          </textarea>
                        </div>
                      </div>
                      





                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Webinar Link
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setLink(e.target.value)}
                            value={link}
                            type="text"
                            name="location_name"
                            id="location_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>




                      
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Date
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            type="date"
                            name="location_name"
                            id="location_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>



                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Start Time
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setStartTime(e.target.value)}
                            value={starttime}
                            type="time"
                            name="location_name"
                            id="location_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>




                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            End Time
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setEndTime(e.target.value)}
                            value={endtime}
                            type="time"
                            name="location_name"
                            id="location_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>




                  











                   
                      

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Module Image
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setMyImage(e.target.files[0])}
                            type="file"
                            multiple
                            accept="image/*"
                            name="image"
                            id="image"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                          />
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          ></label>
                        </div>
                        <div className="sm:col-span-2">
                          <img
                            src={API_URL + myimage}
                            className="h-30 w-full "
                          />
                        </div>
                      </div>



                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Speakers
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setSpeaker(e.target.value)}
                            value={speaker}
                            type="text"
                            name="location_name"
                            id="location_name"
                            placeholder="Saperate names with comma ( , )"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>








{/* Project name */}
<div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            School
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select value={school} onChange={(e) => setSchool(e.target.value)} id="school" name="school" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select School</option>
                            <option value="0">All</option>
                            
                            {schools ? schools.map((value) => <option value={value.ID}>{value.SchoolName}</option>) : ""}
                          </select>
                        </div>
                      </div>




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
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Status
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            id="state"
                            name="state"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Status</option>
                            <option value="Active">Active</option>
                            {/* <option value="Pending">Pending</option> */}
                            <option value="Disabled">Disabled</option>
                            {/* {Object.entries(statesData).map(([key, value]) => (<option key={key} value={key}>{value}</option>)) } */}
                          </select>
                        </div>
                      </div>
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
