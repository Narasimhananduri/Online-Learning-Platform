import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import dynamic from "next/dynamic";
import { useSaveCallback, useLoadData, options, useSetData, useClearDataCallback } from "../editor";

const Editor = dynamic(() => import("../editor/editor").then((mod) => mod.EditorContainer), { ssr: false });
export default function EditTopicDialog(props) {
  const [open, setOpen] = useState(false);
  const [mydata1, setMyData1] = useState("");
  const [mydata2, setMyData2] = useState("");
  const [status, setStatus] = useState("");
  const [courseID, setCourseID] = useState("");
  const [moduleID, setModuleID] = useState("");
  const [levelID, setLevelID] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [topicContent, setTopicContent] = useState("");

  const [addAssetMessage, setAddAssetMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  useEffect(() => {
    setOpen(props.open);
    if (props.open === true) {
      axios
        .post(API_URL + "courses/get_topic_fields.php", {
          id: props.id,
        })
        .then(function (response) {
          if (response.data?.meta?.error === true) {
            setAddAssetMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (response.data?.meta.error === false) {
            setStatus(response.data?.data?.Status ?? "");
            setTopicTitle(response.data?.data?.Title ?? "");
            setTopicContent(response.data?.data?.Content ?? "");
            setModuleID(response.data?.data?.ModuleID ?? "");
            setLevelID(response.data?.data?.LevelID ?? "");
            setCourseID(response.data?.data?.CourseID ?? "");
            setMyData1(response.data?.modules ?? []);
            setMyData2(response.data?.courses ?? []);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [props.open, props.id]);

  const [editor, setEditor] = useState(null);

  // save handler
  const onSave = useSaveCallback(editor);

  // load data
  const { data, loading } = useLoadData(topicContent);
  // const data = topicContent;

  // set saved data
  useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const disabled = editor === null || loading;

  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddAssetMessage("");
    setStatus("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }

  function levelTrigger(level_id) {
    setLevelID(level_id);
    axios.post(API_URL + "getcourses.php", { id: level_id }).then(function (response) {
      setMyData1(response.data?.data);
    });
  }

  function levelTrigger1(level_id) {
    setModuleID(level_id);
    axios.post(API_URL + "getcourses1.php", { id: level_id }).then(function (response) {
      setMyData2(response.data?.data);
    });
  }

  function submitAsset(e) {
    e.preventDefault();
    editor
      .save()
      .then((outputData) => {
        axios
          .post(API_URL + "courses/update_topicc.php", {
            id: props.id,
            course: courseID,
            title: topicTitle,
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
              props.assetUpdated(new Date().getTime());
              closedSuccess(response.data?.meta?.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // }
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  }
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
              <div className="w-screen max-w-full">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Edit Topic</Dialog.Title>
                          <p className="text-sm text-gray-500">Get started by filling in the information below to update topic.</p>
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
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 md:px-64">
                      {addAssetMessage.message ? <Alert type={addAssetMessage.type} message={addAssetMessage.message} icon={addAssetMessage.icon} /> : ""}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="asset_type" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Course Level <sup className="text-red-500">*</sup>
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => levelTrigger(e.target.value)} value={levelID} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
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
                            Course Module <sup className="text-red-500">*</sup>
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => levelTrigger1(e.target.value)} value={moduleID} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
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
                            Course Chapter<sup className="text-red-500">*</sup>
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => setCourseID(e.target.value)} value={courseID} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Course Chapter</option>

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
                            placeholder="Enter Title"
                            onChange={(e) => setTopicTitle(e.target.value)}
                            value={topicTitle}
                            type="text"
                            name="asset_tag"
                            id="asset_tag"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 sm:py-2">
                        <div className="sm:col-span-2">{topicContent ? <Editor reInit editorRef={setEditor} options={options} data={JSON.parse(topicContent)} /> : ""}</div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="brand" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Status
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => setStatus(e.target.value)} value={status} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select Status</option>
                            <option value="Active">Active</option>
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
