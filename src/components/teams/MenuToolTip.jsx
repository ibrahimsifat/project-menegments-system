import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddMemberModal from "./modal/AddMemberModal";
import AllMemberModal from "./modal/AllMemberModal";
import DeleteTeams from "./modal/DeleteTeams";

const MenuToolTip = ({ author, id, members }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  // add member modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // show member modal
  const [allOpen, setAllOpen] = useState(false);
  const handleAllOpen = () => setAllOpen(!allOpen);

  // delete modal
  const [DeleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!DeleteOpen);

  return (
    <>
      {" "}
      <AddMemberModal
        id={id}
        open={open}
        handleOpen={handleOpen}
        members={members}
        handleAllOpen={handleAllOpen}
      />
      {/* see member modal */}
      <AllMemberModal
        author={author}
        allOpen={allOpen}
        handleAllOpen={handleAllOpen}
        members={members}
      />
      {/* delete team modal */}
      {/* <Dialog
        open={DeleteOpen}
        handler={handleDeleteOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to delete this team.</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDeleteOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="red" onClick={handleDeleTeam}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog> */}
      <DeleteTeams
        DeleteOpen={DeleteOpen}
        handleDeleteOpen={handleDeleteOpen}
        id={id}
      />
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
          <MenuItem className="font-semibold" onClick={handleDeleteOpen}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default MenuToolTip;
