import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import {
  FormContact,
  FormLabel,
  FormInput,
  FormButton,
} from './ContactForm.styled';
import Notiflix from 'notiflix';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.array);

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target;

    const isDuplicateContact = contacts.some(
      contact => contact.name.toLowerCase() === name.value.toLowerCase()
    );

    if (isDuplicateContact) {
      Notiflix.Notify.warning('Contact with this name already exists!');
      return;
    }

    dispatch(addContacts(name.value, number.value));
    name.value = '';
    number.value = '';
  };

  return (
    <FormContact onSubmit={handleSubmit}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>
      <FormButton type="submit">Add contact</FormButton>
    </FormContact>
  );
};
