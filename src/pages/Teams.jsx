import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import NavBar from "../components/Navigation/NavBar";
import TeamCard from "../components/teams/TeamCard";
import Error from "../components/ui/Error";
import { useGetTeamsQuery } from "../features/teams/teamApi";
import Logo from "../images/logo.png";
const Teams = () => {
  const [opened, setOpened] = useState(false);
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  console.log(email);
  const { data, isLoading, isError, error } = useGetTeamsQuery(email) || {};
  const { data: userTeam } = data || {};
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <div className="m-2 text-center">
        <Error message={error?.data} />
      </div>
    );
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <li className="m-2 text-center">No Teams found!</li>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data?.map((team) => (
      <TeamCard
        key={team.id}
        teamName={team.name}
        description={team.description}
        color={team.color}
      />
    ));
  }
  return (
    <>
      {/* <!-- Component Start --> */}
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <NavBar />
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Teams</h1>
          <button
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
            onClick={controlModal}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {content}
        </div>
      </div>
      {/* <!-- Component End --> */}

      <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://learnwithsumit.com"
        target="_top"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <img src={Logo} alt="LWS Logo" />
        </div>
        <span className="ml-1 text-sm leading-none">Learn with Sumit</span>
      </a>
      <Modal open={opened} control={controlModal} />
    </>
  );
};

export default Teams;
