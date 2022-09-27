import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavBar from "../components/Navigation/ProjectsNavBar";
import ProjectsBoard from "../components/projects/ProjectsBoard";

const Projects = () => {
  return (
    <div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <NavBar />
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
