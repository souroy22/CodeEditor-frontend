import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import roomReducer from "./room/roomReducer";
import globalReducer from "./global/globalReducer";

const store = configureStore({
  reducer: { userReducer, roomReducer, globalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
