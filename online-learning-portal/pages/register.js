import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Alert from "../components/ui/alert";
import { isStudentLoggedIn, StudentData } from "../utils/Student";
import { districtsData, countriesData } from "../utils/Data";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [agreed, setAgreed] = useState(false);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confPassword, setConfPassword] = useState("");
  const [confPasswordError, setConfPasswordError] = useState(false);

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState(false);

  const [nationality, setNationality] = useState("");
  const [nationalityError, setNationalityError] = useState(false);

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState(false);

  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");

  const [stateKey, setStateKey] = useState(0);

  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);

  const [area, setArea] = useState("");
  const [areaError, setAreaError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [registerError, setRegisterError] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isStudentLoggedIn() === true) {
      router.push("/");
    }
  }, []);

  
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  function Register(e) {
    e.preventDefault();
    setLoginMessage({ type: "", message: "", icon: "" });
    let register_error = false;
    if (fullName.trim() === "") {
     setRegisterError(true);
      setFullNameError(true);
      register_error = true;
    } else {
      setFullNameError(false);
    }
    if (mobile.trim() === "") {
     setMobileError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setMobileError(false);
    }

    if (gender.trim() === "") {
     setGenderError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setGenderError(false);
    }

    if (email.trim() === "") {
     setEmailError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setEmailError(false);
    }

    if (!validateEmail(email)) {
      setEmailValidError(true);
      setRegisterError(true);
      register_error = true;
     } else {
      setEmailValidError(false);
    }
    if (password.trim() === "") {
      setPasswordError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setPasswordError(false);
    }
    if (password.trim() !== confPassword.trim()) {
      setConfPasswordError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setConfPasswordError(false);
    }
    if (country.trim() === "") {
      setCountryError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setCountryError(false);
    }

    if (country.trim() === "IND" && state.trim() === "") {
       setStateError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setStateError(false);
    }
    if (country.trim() === "IND" && district.trim() === "") {
    setDistrictError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setDistrictError(false);
    }
    if (country.trim() === "IND" && city.trim() === "") {
     setCityError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setCityError(false);
    }

    if (country.trim() === "IND" && area.trim() === "") {
     setAreaError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setAreaError(false);
    }

    if (country.trim() !== "IND" && address.trim() === "") {
     setAddressError(true);
      setRegisterError(true);
      register_error = true;
    } else {
      setAddressError(false);
    }

    
   

    if (agreed === false) {
      setAgreeError(true);
      setRegisterError(true);
      register_error = true;
      // document.getElementById("class").focus();
    } else {
      setAgreeError(false);
    }

    if (register_error === false) {
      axios
        .post(API_URL + "register.php", {
          email: email,
          password: password,
          fullname: fullName,
          mobile: mobile,
          gender: gender,
          country: country,
          state: state,
          district: district,
          city: city,
          area: area,
          address: address,
          school: '',
          class: '',
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
            Cookies.set("student_login_token", response.data?.data?.ID, { expires: 10 });
            Cookies.set("student_data", JSON.stringify(response.data?.data), { expires: 10 });
            if (response.data?.data) {
              router.push("/");
            }
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
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
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
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Register</h2>
            </div>
            <div className="mt-6">
              <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      onChange={(e) => setFullName(e.target.value)}
                      type="text"
                      name="full_name"
                      id="full_name"
                      autoComplete="given-name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md"
                    />
                  </div>
                  {fullNameError ? (
                    <span className="text-red-500" id="email_error">
                      Enter your Full Name
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Mobile Number *
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      onChange={(e) => setMobile(e.target.value)}
                      type="text"
                      name="mobile"
                      id="mobile"
                      pattern="[0-9]"
                      autoComplete="family-name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md"
                    />
                  </div>
                  {mobileError ? (
                    <span className="text-red-500" id="email_error">
                      Enter your Mobile Number
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <div className="mt-1">
                    <input type="email" name="email" id="email" autoComplete="email" required onChange={(e) => setEmail(e.target.value)} className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md" />
                  </div>
                  {emailError ? (
                    <span className="text-red-500" id="email_error">
                      Enter your Email
                    </span>
                  ) : emailValidError ? (
                    <span className="text-red-500" id="email_error">
                      Enter Valid Email Address
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <div className="mt-1">
                    <select
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      className=" min-w-full w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-help focus:border-help appearance-none">
                      <option>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {genderError ? (
                    <span className="text-red-500" id="gender_error">
                      Select your Gender
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="mt-1">
                    <input required id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md" />
                  </div>
                  {passwordError ? (
                    <span className="text-red-500" id="email_error">
                      Enter your Password
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      required
                      onChange={(e) => setConfPassword(e.target.value)}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md"
                    />
                  </div>
                  {confPasswordError ? (
                    <span className="text-red-500" id="email_error">
                      Confirm Password should Match
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <div className="mt-1">
                    <div class="">
                      <svg className="w-2 h-2  absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                        <path
                          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                          fill="#648299"
                          fill-rule="nonzero"
                        />
                      </svg>
                      <select
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        className=" w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-help focus:border-help appearance-none">
                        <option>Select Country</option>
                        {countriesData
                          ? countriesData.map((country) => {
                              return <option value={country.code3}>{country.name}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                  </div>
                  {countryError ? (
                    <span className="text-red-500" id="email_error">
                      Select Your Country
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                {country && country === "IND" ? (
                  <>
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        State *
                      </label>
                      <div className="mt-1">
                        <div class="">
                          <svg className="w-2 h-2  absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                            <path
                              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                              fill="#648299"
                              fill-rule="nonzero"
                            />
                          </svg>
                          <select
                            name="state"
                            onChange={(e) => {
                              setState(districtsData[e.target.value].state), setStateKey(e.target.value);
                            }}
                            className=" min-w-full w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-help focus:border-help appearance-none">
                            <option>Select State</option>
                            {districtsData
                              ? districtsData.map((state, key) => {
                                  return <option value={key}>{state.state}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                      </div>
                      {stateError ? (
                        <span className="text-red-500" id="email_error">
                          Select Your State
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        District *
                      </label>
                      <div className="mt-1">
                        <div class="">
                          <svg className="w-2 h-2  absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                            <path
                              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                              fill="#648299"
                              fill-rule="nonzero"
                            />
                          </svg>
                          <select
                            name="district"
                            onChange={(e) => setDistrict(e.target.value)}
                            className=" w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-help focus:border-help appearance-none">
                            <option>Select District</option>
                            {stateKey
                              ? districtsData[stateKey].districts.map((district) => {
                                  return <option>{district}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                      </div>
                      {districtError ? (
                        <span className="text-red-500" id="email_error">
                          Select Your District
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <div className="mt-1">
                        <input onChange={(e) => setCity(e.target.value)} type="text" name="city" id="city" autoComplete="given-name" className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md" />
                      </div>
                      {cityError ? (
                        <span className="text-red-500" id="email_error">
                          Enter your city
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Area *
                      </label>
                      <div className="mt-1">
                        <input onChange={(e) => setArea(e.target.value)} type="text" name="area" id="area" autoComplete="family-name" className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md" />
                      </div>
                      {areaError ? (
                        <span className="text-red-500" id="email_error">
                          Enter your Area
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}

                {country && country !== "IND" ? (
                  <div className=" sm:col-span-2 space-y-5">
                    <div className="sm:col-span-2">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <div className="mt-1">
                        <input onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" autoComplete="organization" className="py-3 px-4 block w-full shadow-sm focus:ring-help focus:border-help border-gray-300 rounded-md" />
                      </div>
                      {addressError ? (
                        <span className="text-red-500" id="email_error">
                          Enter your Address
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {country ? (
                  <>
                    <div className="sm:col-span-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Switch
                            checked={agreed}
                            onChange={setAgreed}
                            className={classNames(
                              agreed ? "bg-indigo-600" : "bg-gray-200",
                              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-help"
                            )}>
                            <span className="sr-only">Agree to policies</span>
                            <span aria-hidden="true" className={classNames(agreed ? "translate-x-5" : "translate-x-0", "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200")} />
                          </Switch>
                        </div>
                        <div className="ml-3">
                          <p className="text-base text-gray-500">
                            Agree to the{" "}
                            <Link href="/privacy-policy">
                              <a className="font-medium text-gray-700 underline">Privacy Policy</a>
                            </Link>{" "}
                            and{" "}
                            <Link href="/terms-of-service">
                              <a className="font-medium text-gray-700 underline">Terms of Service</a>
                            </Link>
                            .
                          </p>
                        </div>
                      </div>
                      {agreeError ? (
                        <span className="text-red-500" id="email_error">
                          Please agree terms and conditions
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="sm:col-span-2">{loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    onClick={(e) => Register(e)}
                    disabled={country ? false : true}
                    className="disabled:opacity-50 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-help hover:bg-help-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-help">
                    Create Account
                  </button>
                </div>
                <div className="mt-6 sm:col-span-2">
                  <div className="relative mb-7">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Already Have an Account?</span>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Link href="/register">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-help border-help hover:bg-help hover:text-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-help">
                        Sign In
                      </button>
                    </Link>
                  </div>
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
