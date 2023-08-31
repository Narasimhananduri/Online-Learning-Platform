import React, { useCallback, useRef } from "react";
import Header from "../template/header";
import Footer from "../template/footer";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import { useState, useEffect } from "react";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";
import { useRouter } from "next/router";

import Confetti from "../../components/ui/confetti";
import ReactCanvasConfetti from "react-canvas-confetti";
import ReactAudioPlayer from 'react-audio-player';




const index = () => {
  const [users1, setUsers1] = useState();
  const router = useRouter();



  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/login?refer=/leaderboard");
    }


    if (isStudentLoggedIn() === true) {
      axios
        .post(API_URL + "leaderboard/leaderboard.php")
        .then(function (response) {
          console.log(response);
          setUsers1(response.data?.data);

          // return;
        });
    }
  }, []);



  return (
    <div>

<head>

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap" rel="stylesheet"/>
</head>



      <Header />

      {/* 
{users1 ? (

users1.map((data,key) => (

<div>
<h1>{key+1}</h1>
  <h1>SID :{data.SID}</h1>
  <h2>Points :{data.TotalPoints}</h2>
</div>

))):""} */}



 

      <div className="md:px-40">
        <div class="px-10 py-7  flex justify-center text-5xl myfont">
          Leaderboard
        </div>


      

        <div class="border border-gray-200 rounded overflow-x-auto min-w-full bg-white ">



        {/* <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} /> */}


        

          <table class="min-w-full text-sm align-middle whitespace-nowrap">
            <thead class="">
              <tr class="border-b border-gray-200">
                <th class="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center myfont">
                  Rank
                </th>
                <th class="p-6 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left myfont">
                  Name
                </th>
                <th class=" text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left myfont">
                  Points
                </th>
              </tr>
            </thead>

            <Confetti/>
           


            <tbody class="">
              {users1
                ? users1.map((data, key) => (
                    <>
                      {key === 0 ? (
                        <tr class="border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-300 mb-5">
                          <td class="py-9 flex justify-center items-center text-center">
                          <span className="text-5xl text-white myfont">{key+1}</span>  
                          </td>
                          <td class="py-9">
                            <div class="flex gap-3">
                              <div>
                                <img
                                  src="https://source.unsplash.com/mEZ3PoFGs_k/64x64"
                                  alt="User Avatar"
                                  class="inline-block w-10 h-12 rounded-full"
                                />
                              </div>

                              <div>
                                <p class="font-medium uppercase text-white text-2xl myfont">
                                  {data.FullName}
                                </p>
                                <p class=" uppercase text-white myfont">
                                  {data.City}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="py-9 text-5xl text-white myfont">
                            {data.TotalPoints}
                          </td>
                        </tr>
                      ) : (
                        <>
                          {key === 1 ? (
                            <tr class="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-300">
                              <td class="py-8 flex justify-center items-center text-center">
                              <span className="text-3xl text-white myfont">{key+1}</span> 
                              </td>
                              <td class="py-8">
                                <div class="flex gap-3">
                                  <div>
                                    <img
                                      src="https://source.unsplash.com/mEZ3PoFGs_k/64x64"
                                      alt="User Avatar"
                                      class="inline-block w-10 h-10 rounded-full"
                                    />
                                  </div>

                                  <div>
                                    <p class="font-medium uppercase text-white myfont">
                                      {data.FullName}
                                    </p>
                                    <p class="uppercase text-white myfont">
                                      {data.City}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="py-8 text-white text-4xl myfont">
                                {data.TotalPoints}
                              </td>
                            </tr>
                          ) : (
                            <>
                              {key === 2 ? (
                                <tr class="border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-300">
                                  <td class="py-6 text-center flex justify-center items-center">
                                 <span className="text-3xl text-white myfont">{key+1}</span> 
                                  </td>
                                  <td class="py-6">
                                    <div class="flex gap-3">
                                      <div>
                                        <img
                                          src="https://source.unsplash.com/mEZ3PoFGs_k/64x64"
                                          alt="User Avatar"
                                          class="inline-block w-10 h-10 rounded-full"
                                        />
                                      </div>

                                      <div>
                                        <p class="font-medium uppercase text-white myfont">
                                          {data.FullName}
                                        </p>
                                        <p class="text-white uppercase myfont">
                                          {data.City}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="py-6 text-white text-4xl myfont">
                                    {data.TotalPoints}
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {key === 3 ? (
                                    <tr class="border-b border-gray-200 bg-gradient-to-r from-yellow-600 to-yellow-200">
                                    <td class="py-6 text-center flex justify-center items-center">
                                    <span className="text-3xl text-white myfont">{key+1}</span> 
                                  </td>
                                      <td class="py-4">
                                        <div class="flex gap-3">
                                          <div>
                                            <img
                                              src="https://source.unsplash.com/mEZ3PoFGs_k/64x64"
                                              alt="User Avatar"
                                              class="inline-block w-10 h-10 rounded-full"
                                            />
                                          </div>

                                          <div>
                                            <p class="font-medium uppercase text-white myfont">
                                              {data.FullName}
                                            </p>
                                            <p class="uppercase text-white myfont">
                                              {data.City}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td class="py-4 text-white text-4xl myfont">
                                        {data.TotalPoints}
                                      </td>
                                    </tr>
                                  ) : (
                                    <>
                                      {key === 4 ? (
                                        <tr class="border-b border-gray-200 bg-gradient-to-r from-pink-600 to-pink-300">
                                        <td class="py-6 text-center flex justify-center items-center">
                                        <span className="text-3xl text-white myfont">{key+1}</span> 
                                  </td>
                                          <td class="py-2">
                                            <div class="flex gap-3">
                                              <div>
                                                <img
                                                  src="https://source.unsplash.com/mEZ3PoFGs_k/64x64"
                                                  alt="User Avatar"
                                                  class="inline-block w-10 h-10 rounded-full"
                                                />
                                              </div>

                                              <div>
                                                <p class="font-medium uppercase text-white myfont">
                                                  {data.FullName}
                                                </p>
                                                <p class="text-white uppercase myfont">
                                                  {data.City}
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="py-2 text-white text-4xl myfont">
                                            {data.TotalPoints}
                                          </td>
                                        </tr>
                                      ) : (
                                        <tr class="border-b border-gray-200">
                                          <td class="py-3 text-center">
                                            {key + 1}
                                          </td>
                                          <td class="py-3">
                                            <div class="flex gap-3">
                                              <div>
                                                <img
                                                  src="https://source.unsplash.com/mEZ3PoFGs_k/64x64"
                                                  alt="User Avatar"
                                                  class="inline-block w-10 h-10 rounded-full"
                                                />
                                              </div>

                                              <div>
                                                <p class="font-medium uppercase">
                                                  {data.FullName}
                                                </p>
                                                <p class="text-gray-500 uppercase">
                                                  {data.City}
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="py-3 text-gray-500">
                                            {data.TotalPoints}
                                          </td>
                                        </tr>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  ))
                : ""}

              {/* 
      <tr class="border-b border-gray-200">
        <td class="p-3 text-center">
         2
        </td>
        <td class="p-3">
          <p class="font-medium">
            Lia Baker
          </p>
          <p class="text-gray-500">
            Web Developer
          </p>
        </td>
        <td class="p-3 text-gray-500">
         345
        </td>
    
      </tr>



      <tr class="border-b border-gray-200">
        <td class="p-3 text-center">
         3
        </td>
        <td class="p-3">
          <p class="font-medium">
            Xavier Rosales
          </p>
          <p class="text-gray-500">
            Author
          </p>
        </td>
        <td class="p-3 text-gray-500">
         200
        </td>
       
      </tr>




      <tr class="border-b border-gray-200">
        <td class="p-3 text-center">
          4
        </td>
        <td class="p-3">
          <p class="font-medium">
            Danyal Clark
          </p>
          <p class="text-gray-500">
            Laravel Developer
          </p>
        </td>
        <td class="p-3 text-gray-500">
          150
        </td>
        
      </tr>


      <tr>
        <td class="p-3 text-center">
         5
        </td>
        <td class="p-3">
          <p class="font-medium">
            Keira Simons
          </p>
          <p class="text-gray-500">
            Marketing Director
          </p>
        </td>
        <td class="p-3 text-gray-500">
          100
        </td>
       
      </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default index;
