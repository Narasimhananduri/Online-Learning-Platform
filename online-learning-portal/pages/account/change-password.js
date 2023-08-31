import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Alert from "../../components/ui/alert";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ChangePassword() {
  const [studentData, setStudentData] = useState(StudentData());
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  const [userID, setUserID] = useState(studentData.ID);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  ChangePassword.getInitialProps = ({}) => {
    return {};
  };
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
  }, []);

  function changePassword(e) {
    e.preventDefault();
    if (password.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter current password.", icon: "error" });
    } else if (newPassword.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter new password.", icon: "error" });
    } else if (newPassword.trim() !== confPassword.trim()) {
      setLoginMessage({ type: "error", message: "Confirm password should be match with new password.", icon: "error" });
    } else {
      axios
        .post(API_URL + "account/change_password.php", {
          new_password: newPassword,
          password: password,
          user_id: userID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "success" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <>
      <Head>
        <title>Help Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}
      <div>
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-16">
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-full transform translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>
            <svg className="absolute right-full bottom-0 transform -translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>

            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Change Password</h2>
            </div>
            <div className="mt-6">
              <form method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Current Password *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      name="curr_password"
                      id="curr_password"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    New Password *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      value={newPassword}
                      type="password"
                      name="new_password"
                      id="new_password"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={(e) => {
                        setConfPassword(e.target.value);
                      }}
                      value={confPassword}
                      type="password"
                      name="con_password"
                      id="con_password"
                      autoComplete="organization"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">{loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    onClick={(e) => changePassword(e)}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-help hover:bg-help-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-help">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
