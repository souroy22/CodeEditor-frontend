import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface JOINED_ROOM_TYPE {
  name: string;
  slug: string;
  createdBy: {
    name: string;
  };
  pinned: boolean;
}

interface ROOM_STATE_TYPE {
  joinedRooms: JOINED_ROOM_TYPE[] | null;
  currentJoinedRoom: JOINED_ROOM_TYPE | null;
  mode: null | string;
}

const initialState: ROOM_STATE_TYPE = {
  mode: null,
  joinedRooms: null,
  currentJoinedRoom: null,
};

export const modeSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string | null>) => {
      return { ...state, mode: action.payload };
    },
    setJoinedRooms: (
      state,
      action: PayloadAction<JOINED_ROOM_TYPE[] | null>
    ) => {
      return { ...state, joinedRooms: action.payload };
    },
    setCurrentRoom: (state, action: PayloadAction<JOINED_ROOM_TYPE>) => {
      return {
        ...state,
        currentJoinedRoom: action.payload,
        joinedRooms:
          state.joinedRooms === null
            ? [action.payload]
            : [action.payload, ...state.joinedRooms],
      };
    },
    togglePinnedRoom: (
      state,
      action: PayloadAction<{ slug: string; isPinned: boolean }>
    ) => {
      let newJoinedRooms = JSON.parse(JSON.stringify(state.joinedRooms));
      newJoinedRooms = newJoinedRooms.map((room: any) => {
        const newRoom = JSON.parse(JSON.stringify(room));
        if (newRoom.slug === action.payload.slug) {
          newRoom.pinned = action.payload.isPinned;
        }
        return newRoom;
      });
      newJoinedRooms.sort((a: any, b: any) => {
        if (a.pinned === b.pinned) {
          return 0;
        }
        return a.pinned ? -1 : 1;
      });
      return { ...state, joinedRooms: newJoinedRooms };
    },
  },
});

export const { setMode, setJoinedRooms, setCurrentRoom, togglePinnedRoom } =
  modeSlice.actions;
export default modeSlice.reducer;
