import { Button, Input, Radio, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../../features/teams/teamApi";
import Error from "../ui/Error";
const colorData = [
  {
    id: "pink",
    name: "color",
    color: "pink",
  },
  {
    id: "purple",
    name: "color",
    color: "purple",
  },
  {
    id: "red",
    name: "color",
    color: "red",
  },
  {
    id: "green",
    name: "color",
    color: "green",
  },
  {
    id: "indigo",
    name: "color",
    color: "indigo",
  },
  {
    id: "blue",
    name: "color",
    color: "blue",
  },
  {
    id: "yellow",
    name: "color",
    color: "yellow",
  },
  {
    id: "amber",
    name: "color",
    color: "amber",
  },
  {
    id: "teal",
    name: "color",
    color: "teal",
  },
];
export default function Modal({ open, control }) {
  const [name, setName] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const { email: userEmail } = user || {};
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("pink");
  // console.log(color);
  const [addTeam, { error, isLoading }] = useAddTeamMutation();
  const resetFrom = () => {
    setName("");
    setColor("");
    setDescription("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addTeam({
        name,
        description,
        color,
        members: [userEmail],
        author: user,
        createdAt: new Date(),
      });
      control();
      resetFrom();
    } catch (error) {}
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded-xl w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            Create a Team
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-3">
                <Input
                  label="Team name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Textarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <p className="font-bold pt-4">Select Color</p>
              <div className="flex w-max gap-4">
                {colorData.map((data) => {
                  const { id, color, name } = data;
                  return (
                    <Radio
                      required
                      key={id}
                      id={id}
                      name={name}
                      color={color}
                      defaultChecked={color === "pink"}
                      onClick={() => setColor(color)}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                disabled={isLoading || name === "" || description.length < 15}
              >
                Send Message
              </Button>
            </div>

            {error?.data && <Error message={error.data} />}
          </form>
        </div>
      </>
    )
  );
}
