import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NameState {
  value: string;
}

const initialState: NameState = {
  value: "",
};
export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateTabName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateTabName } = nameSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
export default nameSlice.reducer;
