import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMore2Fill,
} from "react-icons/ri";
import { useUser } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ setShowSidebar }) => {
  const { user, Logout } = useUser();
  return (
    <header className="fixed left-0 top-0 md:ml-64 w-full md:w-[calc(100%-256px)] bg-[#0A0A0A]/90 flex items-center justify-between p-4 z-40">
      <div>
        <RiMore2Fill
          onClick={() => setShowSidebar(true)}
          className="text-2xl hover:cursor-pointer p-2 box-content md:hidden"
        />
        <div className="hidden md:flex items-center gap-2 text-2xl">
          <RiArrowLeftSLine className="p-2 box-content hover:cursor-pointer bg-main-gray rounded-full" />
          <RiArrowRightSLine className="p-2 box-content hover:cursor-pointer bg-main-gray rounded-full" />
        </div>
      </div>
      {user.username === "" ? (
        <div className="flex items-center gap-6">
          <Link to="/signup" className="hover:text-white transition-colors">
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="py-2 md:py-3 px-4 rounded-full text-side-bub bg-white font-medium hover:scale-105 transition-transform text-black"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <div className="flex gap-x-5 items-center">
          <div className="text-xl">
            Hello <span className="text-green-600">{user.username}</span>
          </div>
          <button
            className="w-32 rounded bg-green-500 hover:bg-green-600 text-black font-bold text-lg"
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
