import { nanoid } from "nanoid";
import React from "react";
import Container from "./Container/Container";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
    filter: '',
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(({contacts}) => ({
      contacts: [contact, ...contacts],
    }));
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))

  }

  formSubmitHandler = data => {
    console.log(data);
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
     return contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter));
  }
  
  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onSumbit={this.addContact} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
        </Container>
      </>
    );
  }
  }

export default App;