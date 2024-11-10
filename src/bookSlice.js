// src/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk to fetch books from the Open Library API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (query) => {
  const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  const data = await response.json();
  return data.docs;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
