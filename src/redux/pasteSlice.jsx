import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_BACKEND_API_KEY; // Change this to your deployed backend URL

// Fetch pastes from MongoDB
export const fetchPastes = createAsyncThunk('paste/fetchPastes', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add paste
export const addToPastes = createAsyncThunk('paste/addToPastes', async (paste) => {
  const response = await axios.post(API_URL, paste);
  toast.success("Paste Created Successfully !");
  return response.data;
});

// Update paste
export const updateToPastes = createAsyncThunk('paste/updateToPastes', async (paste) => {
  const response = await axios.put(`${API_URL}/${paste._id}`, paste);
  toast.success("Paste Updated !");
  return response.data;
});

// Delete paste
export const removeFromPastes = createAsyncThunk('paste/removeFromPastes', async (pasteId) => {
  await axios.delete(`${API_URL}/${pasteId}`);
  toast.success("Paste Deleted !");
  return pasteId;
});

const pasteSlice = createSlice({
  name: 'paste',
  initialState: { pastes: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.pastes = action.payload;
      })
      .addCase(addToPastes.fulfilled, (state, action) => {
        state.pastes.push(action.payload);
      })
      .addCase(updateToPastes.fulfilled, (state, action) => {
        const index = state.pastes.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.pastes[index] = action.payload;
      })
      .addCase(removeFromPastes.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter(p => p._id !== action.payload);
      });
  }
});

export default pasteSlice.reducer;
