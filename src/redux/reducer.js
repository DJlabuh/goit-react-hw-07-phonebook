import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

const persistConfigContacts = {
  key: 'contacts',
  storage,
};

const persistedReducerContacts = persistReducer(
  persistConfigContacts,
  contactsReducer
);

export const reducer = {
  contacts: persistedReducerContacts,
  filter: filterReducer,
};