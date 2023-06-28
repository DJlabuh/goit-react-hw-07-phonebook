import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://6497349a83d4c69925a37ed4.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post('/contacts', contact);
      toast.success('New contact added');
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      toast.success('Contact deleted successfully');
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.array = payload;
};

const handleFulfilledAddProduct = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.array.push(payload);
};

const handleFulfilledDeleteProduct = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  const index = state.array.findIndex(contact => contact.id === payload.id);
  state.array.splice(index, 1);
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsInitialState = {
  array: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilled)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, handleFulfilledAddProduct)
      .addCase(addContacts.rejected, handleRejected)
      .addCase(deleteContacts.pending, handlePending)
      .addCase(deleteContacts.fulfilled, handleFulfilledDeleteProduct)
      .addCase(deleteContacts.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
