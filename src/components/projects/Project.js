import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useDrag } from "react-dnd";
import { CgTrash } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useDeleteProjectMutation } from "../../features/projects/projectsApi";

const Project = ({ project }) => {
  const {
    team: teamName,
    title,
    createdAt,
    stage,
    id,
    author,
    match,
    color,
  } = project;
  const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
  const [deleteProject] = useDeleteProjectMutation();
  console.log(author);
  const avatar = gravatarUrl(loggedInUserEmail, { size: 80 });

  const handleDeleteProject = () => {
    if (loggedInUserEmail !== author) {
      return alert("You are not able to delete");
    }
    let confirm = window.confirm("Are you confirm?");
    if (!confirm) return;
    deleteProject({ id, author });
  };

  // dnd
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id, stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`relative flex flex-col items-start p-4 mt-3 bg-white bg-slate-800 rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${
        match && "border-2 border-blue-700"
      }  ${isDragging ? "opacity-50" : null}`}
      draggable="true"
      ref={drag}
    >
      {stage === "backlog" && (
        <>
          <button
            onClick={handleDeleteProject}
            className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 rounded group-hover:flex"
          >
            <CgTrash className="text-lg text-red-700" />
          </button>
        </>
      )}

      <span
        className={`flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full bg-${color}-100 text-${color}-500`}
      >
        {teamName}
      </span>
      <h4 className="mt-3 text-sm font-medium">{title}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-blue-700 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">
            {moment(createdAt).format("ll")}
          </span>
        </div>
        <img
          className="w-6 h-6 ml-auto rounded-full"
          src={author.avatar}
          alt=""
        />
      </div>
    </div>
  );
};

export default Project;
