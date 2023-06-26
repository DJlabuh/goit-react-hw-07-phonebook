import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

import { Container, SectionComponents, Title, WarningText } from './App.styled';

import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

import { getVisibleContacts } from 'helpers/contactUtils';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <Container>
      <SectionComponents>
        <Title>Phonebook</Title>
        <ContactForm />
      </SectionComponents>
      <SectionComponents>
        <Title>Contacts</Title>
        <Filter />
        {visibleContacts.length ? (
          <ContactList />
        ) : (
          <WarningText>Contact not found!</WarningText>
        )}
      </SectionComponents>
    </Container>
  );
};
