import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from 'redux/operations';

const handlePending = (state) => {
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
  const index = state.array.findIndex((contact) => contact.id === payload.id);
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
  extraReducers: (builder) => {
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
