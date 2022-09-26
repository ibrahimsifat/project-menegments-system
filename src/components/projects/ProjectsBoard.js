import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProjectsQuery } from "../../features/projects/projectsApi";
import { setAssignedProjectsQuery } from "../../features/projects/projectsSlice";
import { useGetTeamsQuery } from "../../features/teams/teamApi";
import Error from "../ui/Error";
import Category from "./Category";

const ProjectsBoard = () => {
  const [isSkip, setIsSkip] = useState(true);
  const { email: loggedInUserEmail } =
    useSelector((state) => state?.auth?.user) || {};
  const { assignedProjectsQuery } = useSelector((state) => state?.projects);
  const dispatch = useDispatch();
  const {
    data: projects,
    isSuccess,
    isError,
    isLoading,
  } = useFetchProjectsQuery(
    { assignedProjectsQuery, sort: "id", order: "desc" },
    {
      skip: isSkip,
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: teams,
    isLoading: teamsLoading,
    isSuccess: teamsLoadingSuccess,
  } = useGetTeamsQuery(loggedInUserEmail);

  useEffect(() => {
    if (!teamsLoading && teamsLoadingSuccess && teams?.length) {
      let assignedTeamsQuery = teams
        ?.map((team) => `team=${team.name.toLowerCase()}`)
        .join("&");
      dispatch(setAssignedProjectsQuery(assignedTeamsQuery));
      setIsSkip(false);
    }
  }, [teams, teamsLoading, teamsLoadingSuccess, dispatch]);

  let transformedProjects = projects?.map((project) => {
    for (let { name, color } of teams) {
      if (name === project.team) {
        project = { ...project, color };
      }
    }
    return project;
  });

  let content = null;

  if (isLoading) content = <div>Loading....</div>;
  if (!isLoading && isError)
    content = <Error message="some thing went wrong" />;
  if (!isError && isSuccess)
    content = (
      <>
        <Category projects={transformedProjects} stage="Backlog"></Category>
        <Category projects={transformedProjects} stage="Ready"></Category>
        <Category projects={transformedProjects} stage="Doing"></Category>
        <Category projects={transformedProjects} stage="Review"></Category>
        <Category projects={transformedProjects} stage="Blocked"></Category>
        <Category projects={transformedProjects} stage="Done"></Category>
      </>
    );

  return (
    <>
      <div className="flex flex-grow px-10 mt-4 gap-5">{content}</div>
    </>
  );
};

export default ProjectsBoard;
