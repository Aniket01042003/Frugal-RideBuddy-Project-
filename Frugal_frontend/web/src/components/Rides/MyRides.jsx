import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRides } from '../../Redux/Action';
import { TbHttpDelete } from "react-icons/tb";
import { API_BASE_URL } from '../../utilis/ApiConfig';
import axios from 'axios';

function MyRides() {
  const dispatch = useDispatch();
  // const [rides, setRides] = useState([]);

  // useEffect(() => {
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

  const user = useSelector((store)=>store.root.user);
  const token = useSelector((store) => store.root.token);
  const userId = user._id;
  console.log("userId from myrides ", userId);
  console.log("token from myrides ", token);


  useEffect(() => {
    dispatch(fetchRides(userId,token))
  }, [dispatch])
  

  const handleDeleteRide = async (id) => {
    if (!token) {
      console.error("Token is missing");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this ride?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`${API_BASE_URL}/rides/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sending token for authentication
        },
      });
  
      console.log(response.data.message); // Log success message
  
      // Refresh the ride list after deletion
      dispatch(fetchRides(userId, token));
    } catch (error) {
      console.error("Error deleting ride:", error.response?.data?.message || error.message);
    }
  };

  const ride = useSelector((store)=>store.root.rides);
  // setRides(ride);
  console.log("ride from myrides ", ride);

  // if (loading) {
  //   return (
  //     <div className="text-center mt-5 text-lg font-semibold text-gray-600">
  //       Loading rides...
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#510366]">
          🚗 My Rides
        </h2>

        {ride.length === 0 ? (
          <p className="text-center text-gray-600">No rides available</p>
        ) : (
          <div className="grid gap-6">
            {ride.map((ride) => (
              <div
                key={ride._id}
                className=" rounded-xl shadow-lg bg-white hover:shadow-xl transition-all p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#510366] to-green-500"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    {/* <p className="text-xl font-semibold text-gray-800">
                      👤 {ride.userName}
                    </p> */}
                    <p className="text-gray-600 ">
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
                    <p className="text-gray-600 mt-1">
                      <strong>⏰ Created At:</strong> {ride.createdAt}
                    </p>
                  </div>

                  {/* Status Button */}
                  <div className="mt-4 sm:mt-0">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteRide(ride._id)}
                          className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600 transition-all"
                        >
                          <TbHttpDelete className='text-[2rem]'/>
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRides