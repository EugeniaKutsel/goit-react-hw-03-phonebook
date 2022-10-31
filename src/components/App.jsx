import { nanoid } from "nanoid";
import React from "react";
import Container from "./Container/Container";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

class App extends React.Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.controls) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onSumbit={this.addContact} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          {contacts.length === 0 ?
            <p>Sorry, there are no contacts in the phonebook yet.</p> :
            <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />}
        </Container>
      </>
    );
  }
  }

export default App;