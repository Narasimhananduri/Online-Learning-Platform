import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import dynamic from "next/dynamic";
import { useSaveCallback, useLoadData, options, useSetData, useClearDataCallback } from "../editor";

const Editor = dynamic(() => import("../editor/editor").then((mod) => mod.EditorContainer), { ssr: false });
export default function AddTopicDialog(props) {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const [courselevel, setCourseLevel] = useState("");
  const [coursemodule, setCourseModule] = useState("");
  const [Course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [optionb, setOptionB] = useState("");
  const [optionc, setOptionC] = useState("");
  const [optiond, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [mydata1, setMyData1] = useState("");
  const [mydata2, setMyData2] = useState("");
  const [status, setStatus] = useState("Active");
  // const [assetType, setAssetType] = useState("");
  // const [location, setLocation] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [status, setStatus] = useState("");
  // const [trackingOption, setTrackingOption] = useState("");
  const [addAssetMessage, setAddAssetMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });
  const [editor, setEditor] = useState(null);

  // save handler
  const onSave = useSaveCallback(editor);

  // load data
  const { data, loading } = useLoadData();

  // set saved data
  useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const disabled = editor === null || loading;

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddAssetMessage("");
    setTag("");
    setCourseLevel("");
    setCourseModule("");
    setCourse("");
    setQuestion("");
    setContent("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setAnswer("");
  }

  function levelTrigger(level_id) {
    setCourseLevel(level_id);
    axios.post(API_URL + "getcourses.php", { id: level_id }).then(function (response) {
      setMyData1(response.data?.data);
    });
  }

  function levelTrigger1(level_id) {
    setCourseModule(level_id);
    axios.post(API_URL + "getcourses1.php", { id: level_id }).then(function (response) {
      console.log(response);
      setMyData2(response.data?.data);
    });
  }

  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function submitAsset(e) {
    e.preventDefault();
    // if (question.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please enter question", icon: "error" });
    // } else if (optiona.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please enter option A", icon: "error" });
    // } else if (optionb.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please Enter option B", icon: "error" });
    // } else if (optionc.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please Enter option C", icon: "error" });
    // } else if (optiond.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please Enter option D", icon: "error" });
    // } else {
    editor
      .save()
      .then((outputData) => {
        // updateEditor();
        axios
          .post(API_URL + "courses/add_topic.php", {
            course: Course,
            title: question,
            content: JSON.stringify(outputData),
            status: status,
          })
          .then(function (response) {
            if (response.data.meta.error === true) {
              setAddAssetMessage({
                type: "error",
                message: response.data?.meta?.message,
                icon: "error",
              });
            }
            if (response.data.meta.error === false) {
              setAddAssetMessage({
                type: "success",
                message: response.data?.meta?.message,
                icon: "success",
              });
              props.assetAdded(new Date().getTime());
              closedSuccess(response.data?.meta?.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
    // }
  }
  async function updateEditor() {
    setContent(await editor.save());
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40" open={open} onClose={closed}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="w-screen max-w-screen">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Add Topic</Dialog.Title>
                          <p className="text-sm text-gray-500">Get started by filling in the information below to add new Topic.</p>
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
                    <div className="py-6 space-y-6 sm:py-20 sm:space-y-0 sm:px-64">
                      {addAssetMessage.message ? <Alert type={addAssetMessage.type} message={addAssetMessage.message} icon={addAssetMessage.icon} /> : ""}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="asset_type" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Course Level
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => levelTrigger(e.target.value)} value={courselevel} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select Level</option>

                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>
                          </select>
                        </div>
                      </div>
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Course Module
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => levelTrigger1(e.target.value)} value={coursemodule} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select Module</option>

                            {mydata1
                              ? mydata1.map((data) => (
                                  <option value={data.ID} key={data.ID}>
                                    {data.ModuleTitle}
                                  </option>
                                ))
                              : ""}
                          </select>
                        </div>
                      </div>
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Chapter
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => setCourse(e.target.value)} value={Course} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Chapter</option>

                            {mydata2
                              ? mydata2.map((data) => (
                                  <option value={data.ID} key={data.ID}>
                                    {data.Title}
                                  </option>
                                ))
                              : ""}
                          </select>

                          {/* {Course} */}
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Title
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            placeholder="Enter Topic Title"
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                            type="text"
                            name="asset_tag"
                            id="asset_tag"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 sm:py-2">
                        <div className="sm:col-span-2">
                          <Editor reInit editorRef={setEditor} options={options} data={data} />
                        </div>
                      </div>

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="brand" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Status
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => setStatus(e.target.value)} value={status} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            {/* <option>Select Status</option> */}
                            <option value="Active">Active</option>
                            {/* <option value="Pending">Pending</option> */}
                            <option value="Disabled">Disabled</option>
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
                        onClick={() => closed()}>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => submitAsset(e)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
