import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Alert from "../components/ui/alert";
import { isUserLoggedIn, UserData } from "../utils/User";

export default function Home() {
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon:"" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  useEffect(() => {
    if (isUserLoggedIn() === true) {
      if(UserData.RoleId==='1'){
        router.push("/admin");
      } else if(UserData.RoleId==='2'){
        router.push("/home");
      }
    }
  },[])


  function Login(e) {
    e.preventDefault();
    if (email.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter email", icon:"error" });
    } else if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setLoginMessage({ type: "error", message: "Please enter valid email", icon:"error" });
    } else if (password.trim() === "") {
      setLoginMessage({ type: "error", message: "Please enter password", icon:"error" });
    } else {
      axios
        .post(API_URL + "login.php", {
          email: email,
          password: password,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon:"error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon:"loading" });
            Cookies.set("login_token", response.data?.data?.UserId, { expires: 10 });
            Cookies.set("user_data", JSON.stringify(response.data?.data), { expires: 10 });
            if(response.data?.data?.RoleId==='1'){
              router.push("/admin");
            } 
            // else if(response.data?.data?.RoleId==='2'){
            //   router.push("/home");
            // }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // useEffect(() => { setLoginMessage(loginMessage); console.log(loginMessage) }, [loginMessage]);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <main>
        <div className="min-h-screen bg-white flex">
          <div className="hidden lg:block relative w-0 flex-1">
            <img className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
          </div>
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img className="h-12 w-auto" src="/logo.png" alt="Workflow" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-sm text-gray-600 max-w">
                  {/* Or{" "}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Contact us to create an account
                  </a> */}
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    {loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                          Remember me
                        </label>
                      </div>

                      {/* <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          Forgot your password?
                        </a>
                      </div> */}
                    </div>

                    <div>
                      <button
                        type="submit"
                        onClick={Login}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
