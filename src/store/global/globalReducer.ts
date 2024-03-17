import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GLOBAL_STATE_TYPE = {
  showNavbar: boolean;
  clickedJoinedRoomSlug: string;
};

const initialState: GLOBAL_STATE_TYPE = {
  showNavbar: false,
  clickedJoinedRoomSlug: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setShowNavbar: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        showNavbar: action.payload,
      };
    },
    setRoomSlug: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        clickedJoinedRoomSlug: action.payload,
      };
    },
  },
});

export const { setShowNavbar, setRoomSlug } = globalSlice.actions;
export default globalSlice.reducer;
