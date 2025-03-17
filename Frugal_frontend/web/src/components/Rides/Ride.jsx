import { useState, useEffect } from "react";
import HomeRide from "./HomeRide";
import ShowRides from "./ShowRides";
import MyRides from "./MyRides";
import FindRides from "./findRides";
import { useSelector } from "react-redux";

const Ride = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Create Ride");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Show Rides":
        return <ShowRides />;
      case "My Rides":
        return <MyRides />;
      case "find Rides":
        return <FindRides />;
      default:
        return <HomeRide setActiveComponent={setActiveComponent}/>;
    }
  };

  const user = useSelector((store)=>store.root.user);

  return (
    <div className="bg-gray-100 ">
      <div className="h-screen flex overflow-hidden bg-gray-200">
        {/* Sidebar */}
        <div
          className={`bg-gray-800 text-white ${isMobile ? "w-full h-56 absolute top-0" : "w-56 min-h-screen absolute left-0"} overflow-y-auto transition-transform transform ${isOpen ? "translate-x-0" : isMobile ? "-translate-y-full" : "-translate-x-full"} ease-in-out duration-300`}
        >
          <div className="p-4">
            <h1 className="text-2xl font-semibold">Sidebar</h1>
            <ul className="mt-4">
              <li className="mb-2">
                <button onClick={() => {setActiveComponent("Create Ride")}} className="block hover:text-indigo-400">Create Ride</button>
              </li>
              <li className="mb-2">
                <button onClick={() => {setActiveComponent("Show Rides")}} className="block hover:text-indigo-400">Show Rides</button>
              </li>
              <li className="mb-2">
                <button onClick={() => {setActiveComponent("My Rides")}} className="block hover:text-indigo-400">My Rides</button>
              </li>
              <li className="mb-2">
                <button onClick={() => {setActiveComponent("find Rides")}} className="block hover:text-indigo-400">find Rides</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isOpen && !isMobile ? "ml-56" : "ml-0"}`}>
          {/* Navbar */}
          <div className="bg-white shadow w-full">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 px-2">
                <h1 className="text-xl font-semibold">Hello Mr. {user.name}</h1>
                <button
                  className="text-gray-500 hover:text-gray-600"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Content Body */}
          <div onClick={() => setIsOpen(false)} className="flex-1 overflow-auto p-4">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;
