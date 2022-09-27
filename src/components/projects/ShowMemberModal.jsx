import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogFooter,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
const ShowMemberModal = ({
  ShowOpen,
  handleShowOpen,
  handleShowProject,
  author,
}) => {
  return (
    <Dialog
      open={ShowOpen}
      handler={handleShowOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      {/* <DialogHeader>
        <p className="mr-4">Author:</p>
        <Avatar src={author.avatar} variant="circular" size="xl" alt="avatar" />
      </DialogHeader> */}
      <div>
        <Card className="w-96">
          <CardHeader floated={false} className="h-80">
            <img src={author.avatar} alt="" className="w-full" />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {author.name}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              CEO / Co-Founder
            </Typography>
          </CardBody>
          <CardFooter className="flex justify-center gap-7 pt-2">
            <Typography
              as="a"
              href="/"
              variant="lead"
              color="blue"
              textGradient
            >
              <Tooltip content="Like">
                <BsFacebook color="#4267B2" />
              </Tooltip>
            </Typography>

            <Tooltip content="Follow">
              <Typography
                as="a"
                href="/"
                variant="lead"
                color="light-blue"
                textGradient
              >
                <AiOutlineTwitter color="#00acee" />
              </Typography>
            </Tooltip>
            <Tooltip content="Follow">
              <Typography
                as="a"
                href="/"
                variant="lead"
                color="purple"
                textGradient
              >
                <AiFillInstagram color="#8a3ab9 " />
              </Typography>
            </Tooltip>
          </CardFooter>
        </Card>
      </div>
      <DialogFooter>
        <Button variant="gradient" color="red" onClick={handleShowProject}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ShowMemberModal;
