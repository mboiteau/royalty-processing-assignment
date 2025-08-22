import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Song } from '../types';

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/songs');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const songs: Song[] = await response.json();
      return songs;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch songs'
      );
    }
  }
);

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    updateSongProgress: (
      state,
      action: PayloadAction<{ id: number; progress: number }>
    ) => {
      const song = state.songs.find(song => song.id === action.payload.id);
      if (song) {
        song.progress = action.payload.progress;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSongs.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
        state.error = null;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateSongProgress } = songsSlice.actions;
export default songsSlice.reducer;
