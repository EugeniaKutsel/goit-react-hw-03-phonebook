import React from "react";
import PropTypes from 'prop-types';
import css from "../ContactList/ContactList.module.css"

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contacts}>
      {contacts.map(({ id, name, number }) =>
      <li key={id} className={css.contacts__item}>
        <p className={css.contacts__name}>{name}:
          <span> {number}</span>
          <button onClick={() => onDeleteContact(id)} className={css.deleteButton}>Delete</button>
        </p>
      </li>
      )}</ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })),
  onDeleteContact: PropTypes.func.isRequired,
}

export default ContactList;