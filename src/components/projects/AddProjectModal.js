import { Button, Input } from "@material-tailwind/react";
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

  //custom style
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
      color: "#000",
      marginTop: "15px",
    }),
    option: (styles) => ({
      ...styles,
      backgroundColor: "#fff",
      color: "#000",
      marginTop: "-4px",
      marginBottom: "-4px",
      fontWeight: "bold",
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
    if (formData?.title?.trim() && formData?.team?.trim()) {
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
          className="fixed w-full h-full inset-0 z-10 bg-slate-800 bg-opacity-80 cursor-pointer border "
        ></div>
        <div className="rounded-xl w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 border-pink-100">
          <h2 className="mt-6 text-center text-3xl font-extrabold ">
            Add Project
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              className="mb-3"
              type="text"
              label="Title"
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
              <Button
                type="submit"
                disabled={
                  isLoading || formData.team === "" || formData.title === ""
                }
              >
                Add Project
              </Button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default AddProjectModal;
