import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, selectContacts, selectIsLoading } from 'redux/selectors';
import { deleteContacts } from 'redux/operations';
import {
  ContactsUl,
  ContactsLi,
  ContactsText,
  ContactsButton,
} from './ContactList.styled.jsx';

import { getVisibleContacts } from 'helpers/contactUtils';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  const visibleContacts = getVisibleContacts(contacts, filter);

  const handleDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <ContactsUl>
      {visibleContacts.map(({ name, phone, id }) => (
        <ContactsLi key={id}>
          <ContactsText>{name}</ContactsText>
          <ContactsText>{phone}</ContactsText>
          <ContactsButton
            onClick={() => handleDeleteContact(id)}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </ContactsButton>
        </ContactsLi>
      ))}
    </ContactsUl>
  );
};
