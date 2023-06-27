import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { contactsApi } from './api/contactsApi';

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware],
});