import React, { useState, useEffect, useContext } from "react";
import support from "../assets/support.svg";
import tour from "../assets/product_tour.svg";
import notification from "../assets/notification.svg";
import profile from "../assets/profile_img.jpeg";
import { IoSearch } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; 

const extractNameFromEmail = (email) => {
  const namePart = email.split('@')[0];
  return namePart.split('.').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' '); 
};

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userEmail } = useUser();
  const userName = extractNameFromEmail(userEmail);
  const { getAuthUrl, handleOAuthCallback, playlists } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (window.location.pathname === "/dashboard" && playlists.length === 0) {
      handleOAuthCallback();
    }
  }, [playlists, handleOAuthCallback]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-[67px] bg-[#27272f] flex items-center justify-between px-3 rounded-lg">
      <span className="font-[700] text-md leading-[18.96px] text-white">
        Design Studio
      </span>
      <div className="flex items-center gap-7">
        <button className="flex h-[34px] bg-[#017EFA] border border-[#017EFA] border-solid rounded-lg p-1 gap-[3px] items-center" onClick={getAuthUrl}>
          <FaYoutube color="white" />
          <span className="font-[400] text-[12px] leading-[14.22px] text-white">
            Import
          </span>
        </button>

        <button className="flex h-[34px]  border border-[#017EFA] border-solid rounded-lg p-1 gap-[3px] items-center">
          <img src={support} alt="support" width="21" height="21" />
          <span className="font-[400] text-[12px] leading-[14.22px] text-white">
            Support Request
          </span>
        </button>

        <button className="flex h-[34px] border border-[#017EFA] border-solid rounded-lg p-1 gap-[3px] items-center">
          <img src={tour} alt="support" width="21" height="21" />
          <span className="font-[400] text-[12px] leading-[14.22px] text-white">
            Product Tour
          </span>
        </button>

        <div className="w-[194px] h-[34px]  border border-white rounded-lg flex items-center px-2 gap-2 opacity-50">
          <input
            className="border-none text-white h-full outline-none w-[85%] bg-transparent"
            type="search"
            placeholder="Search Project..."
          />
          <div className="rounded-xl p-1 border border-white">
            <IoSearch size={20} color="white" />
          </div>
        </div>

        <div className="h-[34px] w-[34px] rounded-lg border border-white border-solid flex items-center justify-center opacity-50">
          <img
            src={notification}
            alt="notification icon"
            width="20px"
            height="20px"
          />
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-300 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={profile}
                  alt="profile image"
                />
              </div>
              <span className="font-[600] text-sm leading-4 text-white">
                {userName}
              </span>
            </div>
            <MdKeyboardArrowDown
              color="white"
              size={20}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-md rounded-md py-2 w-48 z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Account
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout} 
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
