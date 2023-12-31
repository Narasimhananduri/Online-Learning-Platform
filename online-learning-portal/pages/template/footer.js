import Head from "next/head";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/solid";

export default function Footer() {
  return (
    <div className="">
      <footer className="bg-help-dark text-help-lighter body-font">
        <div className="container px-3 md:px-6 lg:px-10 xl:px-28 py-10 md:py-24 flex mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className=" flex-grow md:flex flex-wrap md:text-left text-center">
            <div className="lg:w-1/2 md:w-full w-full ">
              <h2 className="font-semibold text-white text-lg mb-3">Quick Links</h2>
              <nav className="list-none flex space-x-5 justify-center md:justify-start">
                <li className="leading-loose">
                <Link href="/about">
                  <a className="cursor-pointer text-help-lighter hover:text-help-darker">About Us</a>
                  </Link>
                </li>
                <Link href="/contact">
                <li className="leading-loose" href="contact">
                  <a className="cursor-pointer text-help-lighter hover:text-help-darker">Contact Us</a>
                </li>
                </Link>
                <li className="leading-loose">
                  <Link href="/privacy-policy">
                    <a className="cursor-pointer text-help-lighter hover:text-help-darker">Privacy Policy</a>
                  </Link>
                </li>
                <li className="leading-loose">
                  <Link href="/terms-of-service">
                    <a className="cursor-pointer text-help-lighter hover:text-help-darker">Terms of service</a>
                  </Link>
                </li>
              </nav>
              <p className="text-white text-sm text-center sm:text-left mt-5 flex justify-center md:justify-start">
                © 2022 Help Online Learning -
                <a href="" rel="noopener noreferrer" className="text-help-lighter ml-1" target="_blank">
                  Developed by MRCET Students
                </a>
              </p>
            </div> 
            <div className="md:mx-0 mx-auto md:mt-7 lg:mt-0 mt-5">
              <h2 className="font-semibold text-white text-lg mb-3">Contact Us</h2>
              <p className="text-sm text-help-lighter leading-normal">
                <b>Email:</b> narasimhananduri14@gmail.com
              </p>
              <p className="text-sm text-help-lighter leading-normal">
                <b>Address:</b> MRCET , Maisammaguda, Bahadurpally, Hyderabad, Telangana 500100.
              </p>
              <span className="inline-flex md:mt-5 mt-7 items-center">
                <p className="text-sm text-help-lighter leading-normal mr-3">
                  <b>Follow us on: </b>
                </p>
                <a href="" rel="noopener noreferrer" className="cursor-pointer text-help-lighter px-2 rounded-full hover:text-help-darker">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="" rel="noopener noreferrer" className="cursor-pointer ml-2 text-help-lighter px-2 rounded-full hover:text-help-darker">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="" rel="noopener noreferrer" className="cursor-pointer ml-2 text-help-lighter px-2 rounded-full hover:text-help-darker">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a href="" rel="noopener noreferrer" className="cursor-pointer ml-2 text-help-lighter px-2 rounded-full hover:text-help-darker">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
