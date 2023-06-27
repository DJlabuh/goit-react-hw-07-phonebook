import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { useDeleteContactsMutation } from 'redux/api/contactsApi';
import {
  ContactsUl,
  ContactsLi,
  ContactsText,
  ContactsButton,
} from './ContactList.styled.jsx';

import { getVisibleContacts } from 'helpers/contactUtils';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const visibleContacts = getVisibleContacts(contacts, filter);

  console.log(visibleContacts);

  const [deleteContact] = useDeleteContactsMutation();

  return (
    <ContactsUl>
      {visibleContacts.map(({ name, number, id }) => (
        <ContactsLi key={id}>
          <ContactsText>{name}</ContactsText>
          <ContactsText>{number}</ContactsText>
          <ContactsButton onClick={() => deleteContact(id)}>
            Delete
          </ContactsButton>
        </ContactsLi>
      ))}
    </ContactsUl>
  );
};
