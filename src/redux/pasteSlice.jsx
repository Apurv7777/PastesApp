import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { supabase } from '../supabaseClient';

const initialState = {
  pastes: [],
  status: 'idle',
  error: null,
};

export const fetchPastes = createAsyncThunk('pastes/fetchPastes', async () => {
  const { data, error } = await supabase
    .from('pastes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
});

export const addToPastes = createAsyncThunk('pastes/addToPastes', async (paste, { getState, rejectWithValue }) => {
  const { paste: { pastes } } = getState();
  const existingPaste = pastes.find(p => p.title === paste.title);
  if (existingPaste) {
    toast.error("Paste with this title already exists!");
    return rejectWithValue("Duplicate title");
  }

  const { data, error } = await supabase
    .from('pastes')
    .insert([{
      _id: paste._id,
      title: paste.title,
      content: paste.content,
      created_at: paste.createdAt,
      added: true
    }])
    .select();

  if (error) throw error;
  toast.success("Paste Created Successfully !");
  return data[0];
});

export const updateToPastes = createAsyncThunk('pastes/updateToPastes', async (paste) => {
  const { data, error } = await supabase
    .from('pastes')
    .update({ title: paste.title, content: paste.content, added: true })
    .eq('_id', paste._id)
    .select();

  if (error) throw error;
  toast.success("Paste Updated !");
  return data[0];
});

export const removeFromPastes = createAsyncThunk('pastes/removeFromPastes', async (pasteId) => {
  const { error } = await supabase
    .from('pastes')
    .delete()
    .eq('_id', pasteId);

  if (error) throw error;
  toast.success("Paste Deleted !");
  return pasteId;
});

export const resetAllPastes = createAsyncThunk('pastes/resetAllPastes', async () => {
  // CAUTION: This deletes all rows. Ensure RLS or logic matches intent.
  const { error } = await supabase.from('pastes').delete().neq('_id', '0');
  if (error) throw error;
  return;
});

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    // Standard reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPastes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pastes = action.payload;
      })
      .addCase(fetchPastes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add
      .addCase(addToPastes.fulfilled, (state, action) => {
        state.pastes.push(action.payload);
      })
      // Update
      .addCase(updateToPastes.fulfilled, (state, action) => {
        const index = state.pastes.findIndex((item) => item._id === action.payload._id);
        if (index >= 0) {
          state.pastes[index] = action.payload;
        }
      })
      // Remove
      .addCase(removeFromPastes.fulfilled, (state, action) => {
        state.pastes = state.pastes.filter((item) => item._id !== action.payload);
      })
      // Reset
      .addCase(resetAllPastes.fulfilled, (state) => {
        state.pastes = [];
      });
  },
});

export default pasteSlice.reducer;