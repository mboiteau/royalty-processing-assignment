import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';
import songsReducer from './songsSlice';

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
