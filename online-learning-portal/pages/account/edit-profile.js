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
import { districtsData } from "../../utils/Data";
import { UserCircleIcon, UserIcon, LightningBoltIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function EditProfile() {
  const router = useRouter();
  const [studentData, setStudentData] = useState(StudentData());
  const [userId, setUserId] = useState(studentData.ID);

  const [myimage, setMyImage] = useState("");
  const [userimage, setUserImage] = useState(StudentData().Image);

  const [fullName, setFullName] = useState();
  const [fullNameError, setFullNameError] = useState(false);

  const [mobile, setMobile] = useState();
  const [mobileError, setMobileError] = useState(false);

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);

  const [state, setState] = useState();
  const [stateError, setStateError] = useState("");

  const [stateKey, setStateKey] = useState(districtsData.findIndex((x) => x.state === studentData.State));
  const [district, setDistrict] = useState();
  const [districtError, setDistrictError] = useState(false);

  const [city, setCity] = useState();
  const [cityError, setCityError] = useState(false);

  const [area, setArea] = useState();
  const [areaError, setAreaError] = useState(false);

  const [school, setSchool] = useState();
  const [schoolError, setSchoolError] = useState(false);

  const [address, setAddress] = useState();
  const [addressError, setAddressError] = useState(false);

  const [myClass, setMyClass] = useState();
  const [studentClassError, setClassError] = useState(false);

  const [country, setCountry] = useState(studentData.Country);

  const [schools, setSchools] = useState();
  const [schoolInput, setSchoolInput] = useState(false);

  const [gender, setGender] = useState("");

  const [imgfile, uploadimg] = useState("");

  const [loginMessage, setLoginMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  // const [addLocationMessage, setAddLocationMessage] = useState({
  //   type: "",
  //   message: "",
  //   icon: "",
  // });

  function schoolChange(school) {
    if (school === "other") {
      setSchoolInput(true);
    } else {
      setSchoolInput(false);
    }
  }

  EditProfile.getInitialProps = ({}) => {
    return {};
  };

  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
    setFullName(studentData.FullName);
    setMobile(studentData.Mobile);
    setEmail(studentData.Email);
    setState(studentData.State);
    setDistrict(studentData.District);
    setCity(studentData.City);
    setArea(studentData.Area);
    setSchool(studentData.School);
    setAddress(studentData.Address);
    setMyClass(studentData.Class);
    setGender(studentData.Gender);
    

    axios
      .post(API_URL + "get_schools.php")
      .then(function (response) {
        if (response?.data?.meta?.error) {
        }
        if (!response?.data?.meta?.error) {
          setSchools(response?.data?.schools);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function imagehandler(img) {
    uploadimg(URL.createObjectURL(img));

    setMyImage(img);
  }

  function submitLocation(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("user_id", userId);
    if (myimage) {
      formData.append("file", myimage);
    }
    formData.append("fullname", fullName);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("distrtct", district);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("school", "");
    formData.append("address", address);
    formData.append("my_class", "");

    axios
      .post(API_URL + "account/edit_profile.php", formData, config)
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
  }

  function submitData(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("user_id", userId);
    if (myimage) {
      formData.append("file", myimage);
    }
    formData.append("fullname", fullName);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("district", district);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("school", "");
    formData.append("address", address);
    formData.append("my_class", "");
    formData.append("gender", gender);
    formData.append("email", email);

    

    if (fullName.trim() === "") {
       setFullNameError(true);
    } else {
      setFullNameError(false);
    }
    if (mobile.trim() === "") {
      setMobileError(true);
    } else {
      setMobileError(false);
    }

    if (state.trim() === "") {
     setStateError(true);
    } else {
      setStateError(false);
    }
    if (district.trim() === "") {
       setDistrictError(true);
    } else {
      setDistrictError(false);
    }
    if (city.trim() === "") {
     setCityError(true);
    } else {
      setCityError(false);
    }

    if (area.trim() === "") {
     setAreaError(true);
    } else {
      setAreaError(false);
    }

    if (address.trim() === "") {
      setAddressError(true);
    } else {
      setAddressError(false);
    }

    

    if (fullName.trim() !== "" && mobile.trim() !== "") {
      if (country.trim() === "IND" && state.trim() !== "" && district.trim() !== "" && area.trim() !== "") {
        updateData();
      }
      if (country.trim() !== "IND" && address.trim() !== "") {
        updateData();
      }
    }

    function updateData() {
      axios
        .post(API_URL + "account/edit_profile.php", formData, config)
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setLoginMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (!response?.data?.meta?.error) {
            location.reload();
            setLoginMessage({
              type: "success",
              message: response.data?.meta?.message,
              icon: "success",
            });
            Cookies.set("student_data", JSON.stringify(response.data?.data), {
              expires: 10,
            });
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
        <title>Edit Profile - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}
      <div>
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-16">
          <div className="relative max-w-3xl mx-auto">
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

            <div className="px-3 md:px-10">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Edit Profile</h2>
              </div>

              <div className="mt-6">
                <form method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <div className="mt-1">
                      <input
                        require
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        type="text"
                        name="full-name"
                        id="full-name"
                        value={fullName}
                        autoComplete="given-name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                    <label htmlFor="mobile-no" className="block text-sm font-medium text-gray-700">
                      Mobile No *
                    </label>
                    <div className="mt-1">
                      <input
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                        }}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <div className="mt-1">
                      <input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                    </div>

                    {emailError ? (
                      <span className="text-red-500" id="email_error">
                        Enter your Email
                      </span>
                    ) : (
                      ""
                    )}
                    {emailValidError ? (
                      <span className="text-red-500" id="email_valid_error">
                        Enter valid Email
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {studentData.Country === "IND" ? (
                    <>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                          State *
                        </label>
                        <div className="mt-1">
                          <div class="">
                            <select
                              onChange={(e) => {
                                setState(districtsData[e.target.value].state), setStateKey(e.target.value);
                              }}
                              name="state"
                              value={stateKey}
                              className=" min-w-full w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
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
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                          District *
                        </label>
                        <div className="mt-1">
                          <div class="">
                            <select
                              onChange={(e) => {
                                setDistrict(e.target.value);
                              }}
                              value={district}
                              name="district"
                              className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 appearance-none">
                              <option>Select District</option>
                              {stateKey
                                ? districtsData[stateKey].districts.map((district) => {
                                    return <option value={district}>{district}</option>;
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
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City *
                        </label>
                        <div className="mt-1">
                          <input
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="given-name"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
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
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                          Area *
                        </label>
                        <div className="mt-1">
                          <input
                            value={area}
                            onChange={(e) => {
                              setArea(e.target.value);
                            }}
                            type="text"
                            name="area"
                            id="area"
                            autoComplete="family-name"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
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
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <div className="mt-1">
                        <input
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="organization"
                          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        />
                      </div>
                      {addressError ? (
                        <span className="text-red-500" id="email_error">
                          Enter your Address
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  

                  <div className="sm:col-span-2">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender *
                    </label>
                    <div className="mt-1">
                      <select
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        className=" min-w-full w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-help focus:border-help appearance-none">
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  

                  

                  <div className="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700"> Photo </label>
                    <div class="mt-1 flex items-center p-2">
                      <span class="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">{myimage ? <img src={imgfile} className="h-full w-full " /> : <img src={userimage ? API_URL + userimage : "/usericon.png"} className="h-full w-full " />}</span>

                      <input onChange={(e) => imagehandler(e.target.files[0])} type="file" multiple accept="image/*" name="image" id="image" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 p-3" />
                    </div>
                  </div>

                

                  <div className="sm:col-span-2">{loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
                  <div className="sm:col-span-2">
                    <button
                      onClick={(e) => {
                        submitData(e);
                      }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-help hover:bg-help-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
