import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    temp: (state = {}) => state, // Reducer tạm thời
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;