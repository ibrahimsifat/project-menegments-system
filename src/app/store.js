import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
// import counterReducer from '../features/counter/counterSlice';
import authSliceReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectsSlice";
import teamsSliceReducer from "../features/teams/teamSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    teams: teamsSliceReducer,
    projects: projectReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
