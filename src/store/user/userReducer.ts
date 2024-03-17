import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { customLocalStorage } from "../../utils/localStorage";

interface UserType {
  name: null | string;
  email: null | string;
  avatar: null | string;
  id: null | string;
}

export type AuthInitialState = {
  isLoggedIn: boolean;
  user: UserType;
};

const initialState: AuthInitialState = {
  isLoggedIn: false,
  user: {
    name: null,
    email: null,
    avatar: null,
    id: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      const { name, email, avatar, id } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user: { name, email, avatar, id },
      };
    },
    logoutUser: (state) => {
      customLocalStorage.deleteData("token");
      return {
        ...state,
        isLoggedIn: false,
        user: {
          name: null,
          email: null,
          avatar: null,
          id: null,
          joinedRooms: null,
          currentJoinedRoom: null,
        },
      };
    },
  },
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
