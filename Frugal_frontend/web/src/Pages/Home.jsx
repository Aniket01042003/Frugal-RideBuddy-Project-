import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BsHourglass } from "react-icons/bs";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const Array = [
  {
    icon: <BsHourglass className="w-15 h-12" />,
    head: "Your pick of rides at low prices",
    des: "No matter where you’re going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.",
  },
  {
    icon: <VscWorkspaceTrusted className="w-20 h-12" />,
    head: "Trust who you travel with",
    des: "We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you’re travelling with and can book your ride at ease on our secure platform.",
  },
  {
    icon: <BsHourglass className="w-15 h-12" />,
    head: "Scroll, click, tap and go!",
    des: "Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.",
  },
]

function Home() {
  return (
    <div>
      <div className="flex flex-col items-center w-full bg-white">
        {/* Input Section */}
        <section className="w-full flex justify-center">
          <div className="bg-white flex flex-wrap justify-center items-center p-4 shadow-lg space-x-2 w-full md:w-3/4 lg:w-2/3">
            <input
              type="text"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded w-full sm:w-auto"
              placeholder="Enter Pickup Location"
            />
            <span className="text-red-500 text-2xl hidden sm:block">→</span>
            <input
              type="text"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded w-full sm:w-auto"
              placeholder="Enter Drop Location"
            />
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <span className="text-gray-500">👤</span>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto">
              Book
            </button>
          </div>
        </section>

        {/* Content Section */}
        <section className="flex flex-wrap w-full mt-6">
          {/* Left Text Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center p-4">
            <div className="w-full md:w-[80%]">
              {Array.map((item) =>
              (<div className="flex gap-5 mb-5">
                {item.icon}
                <div>
                  <h2 className="text-md font-medium">{item.head}</h2>
                  <p className="text-gray-500 text-xs">
                    {item.des}
                  </p>
                </div>
              </div>)
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-1/3 flex justify-center p-4">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg border border-gray-300">
              <MapContainer
                center={[19.076, 72.8777]} // Mumbai Coordinates
                zoom={12}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[19.076, 72.8777]}>
                  <Popup>Mumbai, India</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-[104%] md:w-1/3 flex justify-center ">
            <img className="w-full" src="src/assets/Untitled.svg" alt="Not Loaded" />
          </div>
        </section>
        <section>
          <div className="w-[100vw]">
            {/* Scam Protection Banner */}
            <div className="bg-[#270031] w-full text-white py-10 text-center flex justify-center items-center">
              <div className="flex gap-40 items-center">
                <img
                  src="src/assets/56108 1.png"
                  alt="Workers"
                  className="w-[22rem] mb-4"
                />
                <h2 className="text-lg font-semibold">Help us keep you safe from scams</h2>
              </div>
            </div>
              <hr/>
            {/* Ride Options Section */}
            <div className="flex flex-col items-center  p-10">
              <div className="flex w-[80%] p-10 items-center justify-between space-x-4">
                <img
                  src="src/assets/image 2.png"
                  alt="Car Navigation"
                  className="w-[20rem]"
                />
                <div className=" w-[50%]">
                  <h2 className="text-xl font-bold">Drive when you want, make what you need</h2>
                  <p className="text-gray-600">Already have an Account? <span className="text-blue-500 cursor-pointer">Sign in</span></p>
                  <button className="bg-black text-white px-4 py-2 mt-2 rounded">Get Started</button>
                </div>
              </div>

              {/* Rent Your Vehicle Section */}
              <div className="flex w-[80%]  items-center justify-between space-x-4">
                <div className=" w-[60%]" >
                  <h2 className="text-xl font-bold">Make money by renting out your Vehicle</h2>
                  <p className="text-gray-600">Already have an Account? <span className="text-blue-500 cursor-pointer">Sign in</span></p>
                  <button className="bg-black text-white px-4 py-2 mt-2 rounded">Get Started</button>
                </div>
                <img
                  src="src/assets/image 3 (1).png"
                  alt="Happy Driver"
                  className="w-[17rem]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
