import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BookmarkIcon,
  ShieldCheckIcon,
  UsersIcon,
  UserIcon,
  LocationMarkerIcon,
  CollectionIcon,
  TruckIcon,
  ClockIcon,
  TableIcon,
  HomeIcon,
  DocumentIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
  UserCircleIcon,
  NewspaperIcon,
  AcademicCapIcon,
  ChatIcon,
  OfficeBuildingIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/outline";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  DuplicateIcon,
  PencilAltIcon,
  SearchIcon,
  SelectorIcon,
  TrashIcon,
  UserAddIcon,
  LinkIcon
  
} from "@heroicons/react/solid";
import { Logout, UserData } from "../../utils/User";
import { useRouter } from "next/router";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// const nav = [
//   { name: "Home", href: "/home", icon: HomeIcon, current: false },
//   { name: "Assets", href: "/assets/assigned", icon: ViewListIcon, current: false },
// ];
const nav = [
  { name: "Home", href: "/admin", icon: HomeIcon, current: false },
  { name: "Students", href: "/students", icon: UsersIcon, current: false },
  { name: "Modules", href: "/module", icon: DocumentIcon, current: false },
  { name: "Chapters", href: "/courses", icon: DocumentDuplicateIcon, current: false },
  { name: "Topics", href: "/courses/topics", icon: DocumentTextIcon, current: false },
  { name: "Chapter Assessments", href: "/quiz", icon: ViewListIcon, current: false },
  { name: "Module Assessments", href: "/quiz1", icon: QuestionMarkCircleIcon, current: false },
  { name: "Certifications", href: "/certificate", icon:AcademicCapIcon, current: false },
  { name: "Feedback", href: "/topicfeedback", icon: ChatIcon, current: false },
  { name: "Webinars", href: "/webinars", icon: LinkIcon, current: false },
];
export default function Admin({ page, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [navigation, setNavigation] = useState(nav);
  const router = useRouter();
  function logOut() {
    if (Logout()) {
      router.push("/");
    }
  }

  useEffect(() => {
    for (var i in nav) {
      if (nav[i].name == page) {
        nav[i].current = true;
      } else {
        nav[i].current = false;
      }
    }
    setNavigation(nav);
    UserData().then((result) => setUserData(result));
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 "
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-10 w-auto mx-auto"
                  src="/logo.png"
                  alt="Workflow"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation
                      ? navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              className={classNames(
                                item.current
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                                "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-gray-500"
                                    : "text-gray-400 group-hover:text-gray-500",
                                  "mr-3 h-6 w-6"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </Link>
                        ))
                      : ""}
                  </div>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:hidden lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white shadow">
          <div className="flex items-center flex-shrink-0 px-6">
            <img
              className="h-20 w-auto mx-auto"
              src="/logo.png"
              alt="Workflow"
            />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* User account dropdown */}
            <Menu
              as="div"
              className="px-3 mt-6 relative inline-block text-left"
            >
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                      <span className="flex w-full justify-between items-center">
                        <span className="flex min-w-0 items-center justify-between space-x-3">
                          <span className="flex-1 flex flex-col min-w-0">
                            <span className="text-gray-900 text-sm font-medium truncate">
                              {userData?.FirstName + " " + userData?.LastName}
                            </span>
                            <span className="text-gray-500 text-sm truncate">
                              {userData?.EmailId}
                            </span>
                          </span>
                        </span>
                        <SelectorIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={logOut}
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            {/* Navigation */}
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Main column */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden bg-gray-100">
        {/* Search header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 ">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex"></div>
            <div className="flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <span className="sr-only">Open user menu</span>
                        {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                        <UserCircleIcon className="w-8 h-8 text-gray-400" />
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                      >
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={logOut}
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
        {/* main content */}
        {children}
      </div>
    </div>
  );
}
