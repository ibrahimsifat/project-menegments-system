import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
const DeleteModal = ({ DeleteOpen, handleDeleteOpen, handleDeleteProject }) => {
  return (
    <Dialog
      open={DeleteOpen}
      handler={handleDeleteOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Are you want to delete this Projects.</DialogHeader>

      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleDeleteOpen}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button variant="gradient" color="red" onClick={handleDeleteProject}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteModal;
