import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // const firstName = useSelector((store) => store.root);
  const firstName = useSelector((store) => store.root?.user?.name);
  console.log("firstName from navbar.jsx ",firstName) 

  return (
    <div>
      <nav className="bg-white shadow border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="src/assets/Group 1 (3).png" className="h-8 w-18" alt="Flowbite Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">Flowbite</span> */}
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium  flex flex-col  items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              {[
                { name: "Home", link: "/", active: true },
                { name: "About", link: "/about" },
                { name: "Contact", link: "/Contact" },
                { name: "Rides", link: "/ride" },
                { name: "Register", link: "/register" },
                { name: "Login", link: "/login" },
              ].map((item) =>
                firstName && item.name === "Login" ? null : ( // Hide Login if logged in
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className={`block py-2 px-3 rounded-sm md:p-0 ${item.active
                          ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                          : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        }`}
                      aria-current={item.active ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}

              {/* Show first letter if logged in */}
              {firstName && (
                <li>
                  <Link to="/profile" className="md:p-4 py-3 px-0 block md:mb-0 mb-2">
                    <div className="flex justify-center items-center text-white bg-purple-500 rounded-2xl w-[2rem] h-[2rem] cursor-pointer">
                      {firstName.charAt(0).toUpperCase()}
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar
