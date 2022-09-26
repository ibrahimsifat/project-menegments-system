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
const people = [
  "Wade Cooper",
  "Arlene McCoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
];
const AddMemberModal = () => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const [open, setOpen] = useState(false);

  // to open modal
  const handleOpen = () => setOpen(!open);
  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  // // add member to database
  // const [email, setEmail] = useState("");

  // const [addTeamMember, { error }] = useAddTeamMemberMutation();
  // const resetFrom = () => {
  //   setEmail("");
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     addTeamMember({
  //       id,
  //       data: { members: [...members, email] },
  //     });
  //     control();
  //     resetFrom();
  //   } catch (error) {}
  // };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Add New Member</DialogHeader>
      <DialogBody>
        <div className="w-full">
          <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Input
              className="border border-blue-200 w-full h-10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-blue-500 px-3 py-2 rounded-md"
              placeholder="Search the person"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Options>
              {filteredPeople.map((person) => (
                <Combobox.Option
                  key={person}
                  value={person}
                  className="w-full h-10  px-3 py-2 bg-blue-50 hover:bg-gray-200 "
                >
                  {person}
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
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="blue" onClick={handleOpen}>
          <span>Add</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddMemberModal;
