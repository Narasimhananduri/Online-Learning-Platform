import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentDownloadIcon, XIcon } from "@heroicons/react/outline";
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UploadExcelDialog(props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [sendMails, setSendMails] = useState(false);
  const [saveDatabase, setSaveDatabase] = useState(true);
  const [zipDownload, setZipDownload] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [uploadExcelMessage, setUploadExcelMessage] = useState({ type: "", message: "", icon: "" });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  function closed() {
    setOpen(false);
    props.onChangeOpen();
  }
  function closedSuccess(message) {
    closed();
    props.successMessage(mesage);
    setUploadExcelMessage("");
    setFile("");
  }
  function submitPatient(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(API_URL + "students/import.php", formData, config)
      .then(function (response) {
        console.log(response.data);
        if (response.data?.meta?.error) {
          setUploadImageMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response.data?.meta?.error) {
          // window.open(response.data?.meta?.file).focus();
          // window.open(response.data?.meta?.file, "_blank").focus();
          setUploadImageMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          props.excelUploaded(new Date().getTime());
          closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-20" open={open} onClose={closed}>
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
              <div className="w-screen max-w-xl">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Bulk Upload</Dialog.Title>
                          <p className="text-sm text-gray-500">Select excel file to bulk upload students data.</p>
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
                      {uploadExcelMessage.message ? <Alert type={uploadExcelMessage.type} message={uploadExcelMessage.message} icon={uploadExcelMessage.icon} /> : ""}

                      <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Download Sample File</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <p>Click download button to download a sample excel file and fill all the details, then upload it bellow.</p>
                            </div>
                            <div className="mt-4">
                              <div className="-mx-2 -my-1.5 flex">
                                <a
                                  href="/Donations.xlsx"
                                  className="flex bg-blue-100 ml-2 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600">
                                  <DocumentDownloadIcon className="h-5 w-5 text-blue-400 mr-2" aria-hidden="true" /> <span>Download</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="image" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Select Excel File:
                          </label>
                        </div>
                        <div className="sm:col-span-2 pt-2">
                          <input onChange={(e) => setFile(e.target.files[0])} type="file" name="image" id="image" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300" />
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
                        onClick={(e) => submitPatient(e)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Upload
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
