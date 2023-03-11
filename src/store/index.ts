import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./generalSlice";
import listsReducer from "./listsSlice";

const store = configureStore({
  reducer: {
    general: generalReducer,
    lists: listsReducer,
  },
  devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
