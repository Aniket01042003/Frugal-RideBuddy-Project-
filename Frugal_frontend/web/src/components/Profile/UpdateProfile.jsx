import React from 'react'
import { TbStatusChange } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Redux/Action';
import { toast } from 'react-toastify';

function UpdateProfile({setIsEditing}) {
  const dispatch = useDispatch();

  const token = useSelector((store) => store.root?.token);
  const user = useSelector((store) => store.root?.user);
  console.log("token from update ", token)

  const handleClick = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      name: data.get("name") || user.name,
      phone: data.get("phone") || user.phone,
    };
  
    dispatch(updateUserProfile(userData, token))
      .then((res) => {
        if (res.success) {
          toast.success("Update Successful");
          setTimeout(() => {
            setIsEditing(false);
          }, 300);
        } else {
          toast.error(res.message || "Not Updated");
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Try again!");
      });
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://tailwindflex.com/images/logo.svg"
                className="w-[2rem] h-[2rem]"
                alt="Logo"
              />
            </div>
            <div className=" flex flex-col items-center">
              <div className="w-full flex-1">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Update Your Profile
                  </div>
                </div>
                <form onSubmit={handleClick} >
                  <div className="mx-auto max-w-xl">
                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="name" name='name' placeholder="Name" />
                    {/* <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="email" name='email' required placeholder="Email" /> */}
                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="number" name='phone'  placeholder="Phone" />
                    <button type='submit' className="mt-5 tracking-wide font-semibold bg-[#6b0a83] text-white w-full py-4 rounded-lg hover:bg-[#470158] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <TbStatusChange className="w-6 h-6 -ml-2" />
                      <span className="ml-2">Update</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by Cartesian Kinetics
                      <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
                    </p>
                  </div></form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
