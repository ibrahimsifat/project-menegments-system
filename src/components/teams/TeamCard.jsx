import React from "react";
import { useSelector } from "react-redux";
import MenuToolTip from "./MenuToolTip";
const TeamCard = ({
  team: { name, description, color, createdAt, author, id, members },
}) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // const controlErrorModal = () => {
  //   setErrorOpened((prevState) => !prevState);
  // };
  return (
    <>
      <div
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        <MenuToolTip author={author} />

        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-50 rounded-full`}
        >
          {name}
        </span>
        <h4 className="mt-3 text-sm font-medium">{description}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {createdAt.slice(0, 11)}
              {/* {new Date().toUTCString().slice(0, 11)} */}
            </span>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default TeamCard;
