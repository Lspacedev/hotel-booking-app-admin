import { createSlice } from "@reduxjs/toolkit";

export const accomodationsSlice = createSlice({
  name: "accomodations",
  initialState: {
    admin: {},
    accomodations: [],
    searchTerm: {},
    searchResults: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setAccomodations: (state, action) => {
      state.accomodations = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});
export const { setSearchTerm, setSearchResults, setAccomodations, setAdmin } =
  accomodationsSlice.actions;

export default accomodationsSlice.reducer;
