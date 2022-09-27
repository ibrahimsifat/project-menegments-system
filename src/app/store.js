import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
// import counterReducer from '../features/counter/counterSlice';
import authSliceReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectsSlice";
import teamsSliceReducer from "../features/teams/teamSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    teams: teamsSliceReducer,
    projects: projectReducer,
    users: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
