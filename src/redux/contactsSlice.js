import { createSlice } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, fetchContacts } from './operations';

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
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFulfilled)
      .addCase(addContacts.fulfilled, handleFulfilledAddProduct)
      .addCase(deleteContacts.fulfilled, handleFulfilledDeleteProduct)
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});
export const contactsReducer = contactsSlice.reducer;