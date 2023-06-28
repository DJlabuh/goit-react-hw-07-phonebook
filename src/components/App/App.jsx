import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, selectContacts, selectIsLoading } from 'redux/selectors';

import { fetchContacts } from 'redux/operations';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, SectionComponents, Title, WarningText } from './App.styled';

import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { Loader } from 'components/Loader/Loader';

import { getVisibleContacts } from 'helpers/contactUtils';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      <ToastContainer />
    </Container>
  );
};
