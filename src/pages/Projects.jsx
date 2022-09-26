import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProjectsBoard from "../components/projects/ProjectsBoard";
import Avatar from "../components/ui/Avatar";
import { search } from "../features/projects/projectsSlice";

const Projects = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(search(e.target.value));
  };

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  return (
    <div class="flex flex-col h-screen overflow-auto text-white bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-800">
      <div className="flex justify-between items-center flex-shrink-0 w-full h-16 px-10 bg-opacity-75">
        <div className="flex gap-6 items-center">
          <img
            src="https://raw.githubusercontent.com/Learn-with-Sumit/think-in-a-redux-way/13.1/html_template/images/logo.png"
            class="h-10 w-10"
            alt=""
          />
          <Link
            className="mx-2 text-sm font-semibold text-white hover:text-indigo-700"
            to="/teams"
          >
            Teams
          </Link>
          <Link
            className="mx-2 text-sm font-semibold hover:text-indigo-700"
            to="/projects"
          >
            Projects
          </Link>
          <input
            className="w-80 flex items-center h-10 px-4 ml-10 text-sm bg-slate-900 border border-gray-600 rounded-full focus:outline-none focus:ring"
            type="search"
            placeholder="Search for anything…"
            onChange={debounce(handleSearch, 400)}
          />
        </div>
        <Avatar />
      </div>

      <div class="px-10 mt-6">
        <h1 class="text-2xl font-bold">Project Board</h1>
      </div>
      <div class="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        <DndProvider backend={HTML5Backend}>
          <ProjectsBoard />
        </DndProvider>
      </div>
    </div>
  );
};

export default Projects;
