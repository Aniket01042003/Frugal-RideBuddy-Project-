import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "../../Redux/Action";
import { MdModeOfTravel } from "react-icons/md";

function ShowRides() {
  const dispatch = useDispatch();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulating API call
  //   setTimeout(() => {
  //     const dummyRides = [
  //       {
  //         _id: "1",
  //         userName: "Rohit Sharma",
  //         source: { name: "Mumbai Central" },
  //         destination: { name: "Pune Station" },
  //         travel_date: "2025-03-15",
  //         time: "10:30 AM",
  //         status: "Confirmed",
  //         contact: "+91 9876543210",
  //       },
  //       {
  //         _id: "2",
  //         userName: "Priya Mehta",
  //         source: { name: "Delhi Airport" },
  //         destination: { name: "Noida Sector 15" },
  //         travel_date: "2025-03-16",
  //         time: "02:00 PM",
  //         status: "Pending",
  //         contact: "+91 8765432109",
  //       },
  //       {
  //         _id: "3",
  //         userName: "Amit Kumar",
  //         source: { name: "Bangalore Majestic" },
  //         destination: { name: "Electronic City" },
  //         travel_date: "2025-03-17",
  //         time: "06:45 PM",
  //         status: "Pending",
  //         contact: "+91 7654321098",
  //       },
  //     ];
  //     setRides(dummyRides);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  const token = useSelector((store) => store.root.token);
  const matchedata = useSelector((store) => store.root.matches);

  useEffect(() => {
    dispatch(fetchMatches(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (matchedata?.rides) {
      setRides(matchedata.rides);
      setLoading(false);
    }
  }, [matchedata]);

  if (loading) {
    return (
      <div className="text-center mt-5 text-lg font-semibold text-gray-600">
        Loading rides...
      </div>
    );
  }

  return (
    <div className="p-6  mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#510366]">
        🚗 My Rides
      </h2>

      {rides.length === 0 ? (
        <p className="text-center text-gray-600">No rides available</p>
      ) : (
        <div className="grid gap-6">
          {rides.map((ride) => (
            <div
              key={ride.travel_date}
              className="border rounded-xl shadow-lg bg-white hover:shadow-xl transition-all p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#510366] to-green-500"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <p className="text-xl font-semibold flex items-center text-gray-800">
                    👤 {ride.creator.name} <div className="text-gray-400 ml-2">({ride.creator.phone})</div>
                  </p>
                  <p className="text-xl font-semibold mt-5 flex items-center text-gray-800"><MdModeOfTravel/> Your RideBuddy </p>
                  {ride.matchedUsers.map((user, index) => (
                    <p key={index} className=" ml-15 flex items-center text-lg font-semibold text-gray-800">
                       {user.name} <div className="text-gray-400 ml-2" >({user.phone})</div>
                    </p>
                  ))}
                  <p className="text-gray-600 mt-1">
                    <strong>📍 Source:</strong> {ride.source.name}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <strong>🎯 Destination:</strong> {ride.destination.name}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <strong>📅 Date:</strong> {ride.travel_date}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <strong>⏰ Time:</strong> {ride.time}
                  </p>
                </div>

                {/* Status Button */}
                <div className="mt-4 sm:mt-0">
                  <span
                    className={`px-3 py-1 text-white text-lg font-semibold rounded-lg bg-green-500`}
                  >
                    Confirmed ✅
                  </span>
                </div>
              </div>
              {ride.status === "Confirmed" && (
                <p className="mt-4 text-gray-700 bg-gray-100 p-3 rounded-lg">
                  <strong>📞 Contact:</strong> {ride.contact}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowRides;
