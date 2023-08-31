import React from "react";

const leaderboard = () => {
  return (
    <div>
      <div class="px-10 py-7  flex justify-center text-5xl font-sans">
        Leaderboard
      </div>

      <div class="px-48 py-24 md:px-96 md:py-3 h-screen bg-gray-600">
        <div class="bg-gray-200 px-11 py-3 flex justify-around items-center rounded-xl bg-gradient-to-r from-red-600 to-red-300 mb-5">
          <div class="text-5xl text-white">1</div>

          <div class="grid">
            <p class="text-5xl mb-3 text-white font-sans">My Name</p>
            <div class="flex gap-3">
              <p class="text-xl text-gray-100 font-serif">class</p>
              <p class="text-xl text-gray-100 font-serif ">School name</p>
            </div>
          </div>

          <div class="text-5xl text-white font-mono">98/100</div>
        </div>

        <div class="bg-gray-200 px-11 py-1  flex justify-around items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-300 mb-5 ">
          <div class="text-5xl text-white ">2</div>

          <div class="grid">
            <p class="text-5xl mb-3 text-white font-sans">My Name</p>
            <div class="flex gap-3">
              <p class="text-xl text-gray-100 font-serif">class</p>
              <p class="text-xl text-gray-100 font-serif ">School name</p>
            </div>
          </div>

          <div class="text-5xl text-white font-mono ">94/100</div>
        </div>

        <div class="bg-gray-200 px-11 py-0  flex justify-around items-center rounded-xl bg-gradient-to-r from-green-600 to-green-300 mb-5">
          <div class="text-5xl text-white ">3</div>

          <div class="grid">
            <p class="text-5xl mb-3 text-white font-sans">My Name</p>
            <div class="flex gap-3">
              <p class="text-xl text-gray-100 font-serif">class</p>
              <p class="text-xl text-gray-100 font-serif ">School name</p>
            </div>
          </div>

          <div class="text-5xl text-white font-mono ">93/100</div>
        </div>

        <div class="bg-gray-200 px-11 py-0  flex justify-around items-center rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-300 mb-5">
          <div class="text-5xl text-white ">4</div>

          <div class="grid">
            <p class="text-5xl mb-3 text-white font-sans">My Name</p>
            <div class="flex gap-3">
              <p class="text-xl text-gray-100 font-serif">class</p>
              <p class="text-xl text-gray-100 font-serif ">School name</p>
            </div>
          </div>

          <div class="text-5xl text-white font-mono ">91/100</div>
        </div>

        <div class="bg-gray-200 px-11 py-0  flex justify-around items-center rounded-xl bg-gradient-to-r from-pink-600 to-pink-300 mb-5">
          <div class="text-5xl text-white">5</div>

          <div class="grid">
            <p class="text-5xl mb-3 text-white font-sans">My Name</p>
            <div class="flex gap-3">
              <p class="text-xl text-gray-100 font-serif">class</p>
              <p class="text-xl text-gray-100 font-serif ">School name</p>
            </div>
          </div>

          <div class="text-5xl text-white font-mono ">89/100</div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#00ffff"
          fill-opacity="1"
          d="M0,96L120,90.7C240,85,480,75,720,85.3C960,96,1200,128,1320,144L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default leaderboard;
