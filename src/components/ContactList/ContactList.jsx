import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContacts } from 'redux/contactsSlice';
import {
  ContactsUl,
  ContactsLi,
  ContactsText,
  ContactsButton,
} from './ContactList.styled.jsx';

import { getVisibleContacts } from 'helpers/contactUtils';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const visibleContacts = getVisibleContacts(contacts, filter);

  const handleDeleteContact = id => {
    dispatch(deleteContacts(id));
  };

  return (
    <ContactsUl>
      {visibleContacts.map(({ name, number, id }) => (
        <ContactsLi key={id}>
          <ContactsText>{name}</ContactsText>
          <ContactsText>{number}</ContactsText>
          <ContactsButton onClick={() => handleDeleteContact(id)}>
            Delete
          </ContactsButton>
        </ContactsLi>
      ))}
    </ContactsUl>
  );
};
