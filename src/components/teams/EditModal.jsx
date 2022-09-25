import { useState } from "react";
import { useAddTeamMemberMutation } from "../../features/teams/teamApi";
import Error from "../ui/Error";

export default function EditModal({ open, control, id, members }) {
  const [email, setEmail] = useState("");

  const [addTeamMember, { error }] = useAddTeamMemberMutation();
  const resetFrom = () => {
    setEmail("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addTeamMember({
        id,
        data: { members: [...members, email] },
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
          className="fixed w-50 h-50 inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded-xl w-[150px] lg:w-[250px] space-y-3 bg-white p-5 absolute top-1/3 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ">
          <h6 className="mt-5 text-center text-xl font-extrabold text-gray-900">
            Add A New Member
          </h6>
          <form className="mt-2 space-y-3" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Add Member
                </label>
                <input
                  id="name"
                  name="name"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="new member name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Send Message
              </button>
            </div>

            {error?.data && <Error message={error.data} />}
          </form>
        </div>
      </>
    )
  );
}
