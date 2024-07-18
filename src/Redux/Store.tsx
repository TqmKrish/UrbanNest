import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Searchbar";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
