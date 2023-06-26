export const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter =
    filter && filter.query ? filter.query.toLowerCase() : '';

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};
