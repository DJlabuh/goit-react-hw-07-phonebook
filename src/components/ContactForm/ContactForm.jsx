import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  FormContact,
  FormLabel,
  FormInput,
  FormButton,
} from './ContactForm.styled';

import {
  useAddContactsMutation,
  useFetchContactsQuery,
} from 'redux/api/contactsApi';

export const ContactForm = () => {
  const { data: contacts = [] } = useFetchContactsQuery();
  const [addContacts, { isLoading }] = useAddContactsMutation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const isDuplicateNumber = contacts.some(contact => contact.phone === phone);

    if (isDuplicateName) {
      toast.error(`Contact with this ${name} already exists!`);
      return;
    }

    if (isDuplicateNumber) {
      toast.error(`Contact with this ${phone} already exists!`);
      return;
    }

    addContacts({
      name,
      phone,
    });

    setName('');
    setPhone('');
  };

  return (
    <FormContact onSubmit={handleSubmit}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>
      <FormButton type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add contact'}
      </FormButton>
    </FormContact>
  );
};
