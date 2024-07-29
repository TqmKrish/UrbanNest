import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Searchbar/Searchbar";
import nameReducer from "./Name/Name";


export const store = configureStore({
  reducer: {
    search: searchReducer,
    name: nameReducer,
  },
});
