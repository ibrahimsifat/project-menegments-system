import { Combobox } from "@headlessui/react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
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
const MenuToolTip = ({ author }) => {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // add member modal
  const [open, setOpen] = useState(false);
  // to open modal
  const handleOpen = () => setOpen(!open);
  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  // show member modal
  const [allOpen, setAllOpen] = useState(false);

  const handleAllOpen = () => setAllOpen(!allOpen);
  return (
    <>
      {/* add member modal */}
      <Dialog
        open={open}
        handler={handleOpen}
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
      {/* see member modal */}
      <Dialog
        open={allOpen}
        handler={handleAllOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad
          reprehenderit omnis perspiciatis aut odit! Unde architecto
          perspiciatis, dolorum dolorem iure quia saepe autem accusamus eum
          praesentium magni corrupti explicabo!
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleAllOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleAllOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* drop down menu */}
      <Menu placement="right-start">
        <MenuHandler>
          <button
            className={`absolute top-0 right-0  items-center justify-center  ${
              author?.email !== email && "hidden"
            } w-5 h-5 mt-3 mr-2 text-gray-500 rounded `}
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </MenuHandler>
        <MenuList className={`"border-2 border-pink-100`}>
          <MenuItem className="font-semibold" onClick={handleOpen}>
            Add New Member
          </MenuItem>
          <MenuItem className="font-semibold" onClick={handleAllOpen}>
            All Members
          </MenuItem>
          {/* <MenuItem>Menu Item 3</MenuItem> */}
        </MenuList>
      </Menu>
    </>
  );
};

export default MenuToolTip;
