import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
}

const initialState: SearchState = {
  value: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
export default searchSlice.reducer;
