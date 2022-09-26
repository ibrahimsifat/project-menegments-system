import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useAddNewProjectMutation } from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamApi";

const AddProjectModal = ({ open, control }) => {
  const [formData, setFormData] = useState({ team: "", title: "" });
  const [addNewProject, { isLoading }] = useAddNewProjectMutation();
  const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
  const { data: teams } = useGetTeamsQuery(loggedInUserEmail);

  //custume style
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#0f172a",
      color: "#fff",
    }),
    option: (styles) => ({
      ...styles,
      backgroundColor: "#0f172a",
      marginTop: "-4px",
      marginBottom: "-4px",
    }),
  };

  const handleChange = (e) => {
    let target = e.target;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const options = teams?.map((team) => ({
    label: team.name,
    value: team.name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.team.trim()) {
      addNewProject({
        author: loggedInUserEmail,
        team: formData?.team.toLowerCase(),
        title: formData?.title,
        stage: "backlog",
        createdAt: new Date(),
      });
      setFormData({ team: "", title: "" });
      control(false);
    }
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-slate-800 bg-opacity-80 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-slate-900 p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Add Project
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input input-bordered w-full max-w-full mb-2 bg-slate-900"
              placeholder="Title"
              name="title"
              required
              onChange={handleChange}
              value={formData?.title}
            />
            <Select
              styles={colourStyles}
              placeholder={"Select team name"}
              options={options}
              noOptionsMessage={() => "Team does not exist"}
              isSearchable={true}
              onChange={(selectedOption) =>
                setFormData({ ...formData, team: selectedOption.value })
              }
            />

            <div className="text-center mt-4 flex mx-auto">
              <button
                className="inline-block w-auto px-6 py-3 text-white bg-blue-700 rounded-lg font-semibold text-sm mt-4 order-1"
                type="submit"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default AddProjectModal;
