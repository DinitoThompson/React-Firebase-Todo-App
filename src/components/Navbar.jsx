import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [userImage, setUserImage] = useState("");

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="h-[80px] w-full p-4 bg-[#161a2b] flex justify-between items-center">
      {/* Welcome Message */}
      <div className="text-white">
        {user ? (
          <h1>Welcome, {user.displayName}</h1>
        ) : (
          <h1>Welcome, Demo User</h1>
        )}
      </div>
      {/* User Image */}
      <div className="w-[70px] h-[70px]">
        {user ? (
          <img src={`${user.photoURL}`} alt="/" className="rounded-full" />
        ) : (
          <img src="/" alt="/" />
        )}
      </div>
      {/* Log Out / Go Back Button */}
      <div className="text-white">
        {user ? (
          <button
            onClick={handleSignOut}
            className="p-2 bg-gradient-to-r from-purple-800 to-purple-500 rounded-lg hover:scale-105 duration-300 text-slate-100 w-[100px]"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={handleGoBack}
            className="p-2 bg-gradient-to-r from-purple-800 to-purple-500 rounded-lg hover:scale-105 duration-300 text-slate-100 w-[150px]"
          >
            Go To Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
