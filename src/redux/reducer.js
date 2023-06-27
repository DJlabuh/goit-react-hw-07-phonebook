import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import { contactsApi } from './api/contactsApi';

export const reducer = {
  contacts: contactsReducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  filter: filterReducer,
};