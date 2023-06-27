import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { useDeleteContactsMutation } from 'redux/api/contactsApi';
import {
  ContactsUl,
  ContactsLi,
  ContactsText,
  ContactsButton,
} from './ContactList.styled.jsx';

import { getVisibleContacts } from 'helpers/contactUtils';

import { useFetchContactsQuery } from 'redux/api/contactsApi';

export const ContactList = () => {
  const { data: contacts = [] } = useFetchContactsQuery();

  const filter = useSelector(selectFilter);

  const visibleContacts = getVisibleContacts(contacts, filter);

  const [deleteContact] = useDeleteContactsMutation();

  return (
    <ContactsUl>
      {visibleContacts.map(({ name, phone, id }) => (
        <ContactsLi key={id}>
          <ContactsText>{name}</ContactsText>
          <ContactsText>{phone}</ContactsText>
          <ContactsButton onClick={() => deleteContact(id)}>
            Delete
          </ContactsButton>
        </ContactsLi>
      ))}
    </ContactsUl>
  );
};
