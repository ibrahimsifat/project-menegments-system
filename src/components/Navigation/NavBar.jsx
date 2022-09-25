import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import Logo from "../../images/logo.png";
const NavBar = () => {
  const dispatch = useDispatch();
  const {
    user: { avatar },
  } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={Logo} className="h-10 w-10" alt="" />
      <input
        className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
        type="search"
        placeholder="Search for anything…"
      />
      <div className="ml-10">
        <Link
          className="mx-2 text-sm font-semibold text-indigo-700"
          to="/projects"
        >
          Projects
        </Link>
        <Link
          className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
          to="/teams"
        >
          Team
        </Link>
      </div>
      <div className="flex items-center ml-auto overflow-">
        <img
          src={avatar}
          alt=""
          className="rounded-full w-8 h-8 mr-4 cursor-pointer"
        />
        <span
          className="font-bold cursor-pointer hover:text-purple-700"
          onClick={logout}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default NavBar;
