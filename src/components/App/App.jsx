import { useFetchContactsQuery } from 'redux/api/contactsApi';

import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';

import { Container, SectionComponents, Title, WarningText } from './App.styled';

import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { Loader } from 'components/Loader/Loader';

import { getVisibleContacts } from 'helpers/contactUtils';

export const App = () => {
  const { data: contacts = [], isFetching: isLoading } =
    useFetchContactsQuery();

  const filter = useSelector(selectFilter);

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
        {isLoading ? (
          <Loader />
        ) : visibleContacts.length ? (
          <ContactList />
        ) : (
          <WarningText>Contact not found!</WarningText>
        )}
      </SectionComponents>
    </Container>
  );
};
