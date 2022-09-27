import { Combobox } from "@headlessui/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateProjectTeamMutation } from "../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../features/teams/teamApi";
const EditTeamModal = ({ EditOpen, handleEditOpen, id, setEditOpen }) => {
  const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
  const [selectedPerson, setSelectedPerson] = useState("");
  const { data } = useGetTeamsQuery(loggedInUserEmail);
  const teamsName = data?.map((user) => [user.name]).flat();

  const [updateProjectTeam] = useUpdateProjectTeamMutation();
  const handleEditProject = (selectedPerson) => {
    updateProjectTeam({
      id,
      data: {
        team: selectedPerson,
      },
    });
    setEditOpen(!EditOpen);
    setSelectedPerson("");
  };
  return (
    <Dialog
      open={EditOpen}
      handler={handleEditOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Add New Member</DialogHeader>
      <DialogBody>
        <div className="w-full">
          <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Input
              className="border border-blue-200 w-full h-10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-md"
              placeholder="Search your Teams"
            />
            <Combobox.Options>
              {teamsName?.map((team) => (
                <Combobox.Option
                  key={team}
                  value={team}
                  className="w-full h-10  px-3 py-2 bg-blue-50 hover:bg-gray-200 "
                >
                  {team}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleEditOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          disabled={selectedPerson === ""}
          variant="gradient"
          color="blue"
          type="submit"
          onClick={() => handleEditProject(selectedPerson)}
        >
          <span>Add</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditTeamModal;
