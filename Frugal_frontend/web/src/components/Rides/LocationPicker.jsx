import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { createRide } from "../../Redux/Action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LocationPicker = ({setActiveComponent}) => {
  const [source, setSource] = useState({ name: "", lat: "", lng: "" });
  const [destination, setDestination] = useState({ name: "", lat: "", lng: "" });
  const [mapType, setMapType] = useState(null);
  const [tempPosition, setTempPosition] = useState([19.076, 72.8777]); // Default: Mumbai
  const [tempName, setTempName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [satelliteView, setSatelliteView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const modalRef = useRef(null);

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Disable weekends
  };

  // Fetch location name using reverse geocoding
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

  // Handle map click to select a new location
  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setTempPosition([lat, lng]);

        const name = await fetchLocationName(lat, lng); // Get location name
        setTempName(name);
      },
    });

    return (
      <Marker position={tempPosition}>
        <Popup>{tempName}</Popup>
      </Marker>
    );
  };

  const MoveMap = ({ position }) => {
    const map = useMap();
    map.flyTo(position, 14, { duration: 1.5 });
    return null;
  };

  const openMap = async (type) => {
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
  const token = useSelector((store) => store.root.token);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setMapType(null);
    }
  };

  // Search for locations using OpenStreetMap API
  const searchLocation = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=IN`
      );
      const data = await response.json();

      setSearchResults(
        data.map((place) => ({
          name: place.display_name,
          lat: parseFloat(place.lat),
          lon: parseFloat(place.lon),
        }))
      );
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };


  const selectLocation = (lat, lon, name) => {
    setTempPosition([lat, lon]);
    setTempName(name);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleCreateRide = () => {
    if (!source.name || !destination.name || !date || !time) {
      alert("Please fill all required fields (Source, Destination, Date, and Time) before creating a ride.");
      return;
    }
    const rideData = {
      source: {
        name: source.name || "Unknown Source",
        coordinates: [source.lng, source.lat],
      },
      destination: {
        name: destination.name || "Unknown Destination",
        coordinates: [destination.lng, destination.lat],
      },
      travel_date: date ? date.toISOString().split("T")[0] : "Not selected",
      time: time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : "Not selected",
    };

    console.log("Ride Data:", rideData);

    dispatch(createRide(rideData, token))
      .then((res) => {
        if (res.success) {
          toast.success("Ride Created");
          setActiveComponent("My Rides")
        } else {
          toast.error(res.message || "Ride Not Created");
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Try again!");
      });
};


  return (
    <div>
      <div className="flex justify-center" >
        <div className="flex flex-col border shadow-xl mt-10 h-[32rem] w-[32rem] justify-center items-center gap-4 p-6 relative">
          {/* Source Input */}
          <div className="w-full max-w-md">
            <label className="block font-semibold">Source Location:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md cursor-pointer"
              placeholder="Click to select source"
              value={source.name || ""}
              readOnly
              onClick={() => openMap("source")}
            />
          </div>

          {/* Destination Input */}
          <div className="w-full max-w-md">
            <label className="block font-semibold">Destination Location:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md cursor-pointer"
              placeholder="Click to select destination"
              value={destination.name || ""}
              readOnly
              onClick={() => openMap("destination")}
            />
          </div>

          {/* Date Picker */}
          <div className="w-full max-w-md">
            <label className="block font-semibold mb-1">Select Date:</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              filterDate={isWeekday}
              className="w-full border p-2 rounded-md"
              dateFormat="yyyy-MM-dd"
              placeholderText="Click to select a Date"
            />
          </div>

          {/* Time Picker */}
          <div className="w-full max-w-md">
            <label className="block font-semibold mb-1">Select Time:</label>
            <DatePicker
              selected={time}
              onChange={(time) => setTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="w-full border p-2 rounded-md"
              placeholderText="Click to select a Time"
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleCreateRide}

          >
            Create Ride
          </button>


          {/* Location Selection Modal */}
          {mapType && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#353535a3] bg-opacity-50 z-50" onClick={handleOutsideClick}>
              <div className="bg-white rounded-lg shadow-lg p-5 w-11/12 md:w-3/5 lg:w-[70rem] relative" ref={modalRef}>
                <h2 className="text-lg font-semibold mb-2 text-center">
                  Select {mapType === "source" ? "Source" : "Destination"} Location
                </h2>

                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => searchLocation(e.target.value)}
                />

                {searchResults.length > 0 && (
                  <ul className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                    {searchResults.map((place, index) => (
                      <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => selectLocation(place.lat, place.lon, place.name)}>
                        {place.name}
                      </li>
                    ))}
                  </ul>
                )}

                <MapContainer center={tempPosition} zoom={12} style={{ width: "100%", height: "300px" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MoveMap position={tempPosition} />
                  <LocationMarker />
                </MapContainer>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={confirmSelection}>Confirm</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;

