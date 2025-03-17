import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../utilis/ApiConfig";

const FindRides = () => {
  const [source, setSource] = useState({ name: "", lat: "", lng: "" });
  const [destination, setDestination] = useState({ name: "", lat: "", lng: "" });
  const [mapType, setMapType] = useState(null);
  const [tempPosition, setTempPosition] = useState([19.076, 72.8777]);
  const [tempName, setTempName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [matchedRides, setMatchedRides] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      return data.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setTempPosition([lat, lng]);
        const name = await fetchLocationName(lat, lng);
        setTempName(name);
      },
    });
    return <Marker position={tempPosition}><Popup>{tempName}</Popup></Marker>;
  };

  const MoveMap = ({ position }) => {
    const map = useMap();
    map.flyTo(position, 14, { duration: 1.5 });
    return null;
  };

  const openMap = (type) => {
    setMapType(type);
    setSearchQuery("");
    setSearchResults([]);
    if (type === "source" && source.lat) {
      setTempPosition([source.lat, source.lng]);
      setTempName(source.name);
    } else if (type === "destination" && destination.lat) {
      setTempPosition([destination.lat, destination.lng]);
      setTempName(destination.name);
    } else {
      setTempPosition([19.076, 72.8777]);
      setTempName("");
    }
  };

  const confirmSelection = () => {
    if (mapType === "source") {
      setSource({ name: tempName, lat: tempPosition[0], lng: tempPosition[1] });
    } else if (mapType === "destination") {
      setDestination({ name: tempName, lat: tempPosition[0], lng: tempPosition[1] });
    }
    setMapType(null);
  };
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setMapType(null);
    }
  };

  const searchLocation = async (query) => {
    setSearchQuery(query);
    if (!query) return setSearchResults([]);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=IN`);
      const data = await response.json();
      setSearchResults(data.map(place => ({ name: place.display_name, lat: parseFloat(place.lat), lon: parseFloat(place.lon) })));
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleSearchRide = () => {
    if (!source.name || !destination.name) {
      toast.error("Please fill all required fields before creating a ride.");
      return;
    }
    const rideData = {
      source: { name: source.name, coordinates: [source.lng, source.lat] },
      destination: { name: destination.name, coordinates: [destination.lng, destination.lat] }
    };
    console.log("ride data from findrides ", rideData);
  };

  useEffect(() => {
    if (source.name && destination.name) {
      fetchMatchedRides();
    }
  }, [source, destination]);

  const token = useSelector((store) => store.root.token);
  const user = useSelector((store) => store.root.user);
  // console.log(user);
  const fetchMatchedRides = async () => {
    try {
      const response = await axios.post("http://localhost:5500/api/rides/match", {
        source: { name: source.name, coordinates: [source.lng, source.lat] },
        destination: { name: destination.name, coordinates: [destination.lng, destination.lat] },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setMatchedRides(response.data);
      console.log(matchedRides);
    } catch (error) {
      console.error("Error fetching matched rides:", error);
      toast.error("Failed to fetch rides.");
    }
  };

  const confirmRide = async (rideId) => {
    try {
      await axios.put(`${API_BASE_URL}/matches/${rideId}`, {status : "confirmed"}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      toast.success("Ride confirmed successfully!");
    } catch (error) {
      console.error("Error confirming ride:", error);
      toast.error("Failed to confirm ride.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Find a Ride</h2>
        <label className="block font-semibold">Source Location:</label>
        <input type="text" className="w-full border p-2 rounded-md cursor-pointer" placeholder="Click to select source" value={source.name} readOnly onClick={() => openMap("source")} />
        <label className="block font-semibold mt-4">Destination Location:</label>
        <input type="text" className="w-full border p-2 rounded-md cursor-pointer" placeholder="Click to select destination" value={destination.name} readOnly onClick={() => openMap("destination")} />
        <button className="w-full bg-green-500 text-white p-3 rounded-md mt-4" onClick={handleSearchRide}>Search</button>
      </div>
      <div className="w-[60%] mt-4" >
        {matchedRides.length === 0 ? (
          <p className="text-center text-gray-600">No rides available</p>
        ) : (
          <div className="grid gap-6 w-full">
            {matchedRides.map((ride) => (
              <div
                key={ride._id}
                className="border rounded-xl shadow-lg bg-white hover:shadow-xl transition-all p-5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#510366] to-green-500"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      👤 {ride.userId.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>📍 Source:</strong> {ride.source.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>🎯 Destination:</strong> {ride.destination.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>📅 Date:</strong> {ride.travel_date}
                    </p>
                    <p className="text-gray-600">
                      <strong>⏰ Time:</strong> {ride.time}
                    </p>
                  </div>

                  {/* Status Button */}
                  <div className="mt-4 ml-4 sm:mt-0">
                    <div className="flex gap-3">
                      <button
                        onClick={() => confirmRide(ride._id)}
                        className={`px-4 py-2 rounded-lg transition-all ${user._id === ride.userId._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                        disabled={user._id === ride.userId._id}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Info (only visible if Confirmed) */}
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
      {mapType && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#353535a3] bg-opacity-50" onClick={handleOutsideClick}>
          <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-[70rem] relative" ref={modalRef}>
            <h2 className="text-lg font-semibold mb-2 text-center">Select {mapType === "source" ? "Source" : "Destination"} Location</h2>
            <input type="text" className="w-full border p-2 rounded-md" placeholder="Search location..." value={searchQuery} onChange={(e) => searchLocation(e.target.value)} />
            {searchResults.length > 0 && (
              <ul className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                {searchResults.map((place, index) => (
                  <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => setTempPosition([place.lat, place.lon])}>{place.name}</li>
                ))}
              </ul>
            )}
            <MapContainer center={tempPosition} zoom={12} style={{ width: "100%", height: "300px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MoveMap position={tempPosition} />
              <LocationMarker />
            </MapContainer>
            <button className="bg-blue-500 text-white p-2 rounded-md mt-4" onClick={confirmSelection}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindRides;