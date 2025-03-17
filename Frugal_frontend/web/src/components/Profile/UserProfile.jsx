import React, { useEffect, useState } from "react";
import UpdateProfile from "./updateProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../Redux/Action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate();
  const user = useSelector((store) => store.root?.user);
  console.log("user from UserProfile.jsx ", user)
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
  
    if (token) {  // ✅ Only fetch if token exists
      dispatch(fetchUserProfile(token))
        .then((res) => {
          if (res.success) {
            toast.success("Login Successful But Update information first by clicking edit");
          } else {
            toast.error(res.message || "Invalid Credentials");
          }
        })
        .catch(() => {
          toast.error("Something went wrong. Try again!");
        });
    }
  }, [location.search, dispatch]);

  const handlelogout = ()=>{
    localStorage.setItem("token"," ");
    dispatch(logout());
    navigate("/");
  }


  return (
    <section className="mt-10 p-4">
      <div className="w-full md:w-1/2 md:mx-auto flex flex-col md:flex-row  justify-center text-center">
        <div className="flex bg-[#6b0a83] m-[2rem] justify-center items-center w-[10rem] h-[5rem] rounded-[2rem] " >
          {/* <span className="text-[5rem] text-[white]" >{user?.name[0]}</span> */}
          <span className="text-[5rem] text-[white]" >{user?.name[0]}</span>
        </div>
        <div className="flex flex-col">
          <div className="md:text-justify mb-3">
            <div className="flex flex-col mb-5">
              <p className="text-indigo-900 font-bold text-xl">{user?.name}</p>

              <ul className="mt-2 flex flex-row items-center justify-center md:justify-start">
                <li className="mr-5">
                  <a href="#" target="_blank" aria-label="GitHub">
                    <svg
                      className="h-6 text-indigo-700 hover:text-indigo-300"
                      fill="currentColor"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                    </svg>
                    <div className="flex flex-col" >
                      <span>{user?.email}</span>
                      <span>{user?.phone}</span>
                      <span>Rating : {user?.rating}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <p className="text-indigo-300 font-semibold text-center md:text-left">
              Insurance Specialist | Protecting Lives and Assets | Dedicated to Your Peace of Mind | Serving Since 2007 | Your Trusted Risk Manager
            </p>

          </div>
          <div className="flex gap-[10px]" >
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 hover:bg-green-700 w-[8rem] text-white max-w-[10rem] font-bold py-2 px-4 rounded-full mb-2"
            >
              Edit Profile
            </button>
            <button onClick={handlelogout} class="bg-blue-500 hover:bg-blue-700 w-[8rem] text-white max-w-[10rem] font-bold py-2 px-4 rounded-full mb-2">
              Logout
            </button>
          </div>
        </div>
      </div>
      {isEditing && <UpdateProfile setIsEditing={setIsEditing} onClose={() => setIsEditing(false)} />}
    </section>
  );
};

export default UserProfile
