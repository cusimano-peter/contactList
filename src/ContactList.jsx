import React, { useState, useEffect } from 'react'
  import ContactRow from "./ContactRow"

  const dummyContacts = [
    { id: 1, name: "R2-D2", phone: "222-222-2222", email: "r2d2@droids.com" },
    { id: 2, name: "C-3PO", phone: "333-333-3333", email: "c3po@droids.com" },
    { id: 3, name: "BB-8", phone: "888-888-8888", email: "bb8@droids.com" },
  ];

  export default function ContactList() {
    const [contacts, setContacts] = useState(dummyContacts);

    useEffect(() => {
      async function fetchContacts() {
        try {
          const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          setContacts(data.map(user => ({
            id: user.id,
            name: user.name, 
            phone: user.phone, 
            email: user.email 
          })));
        } catch (error) {
          console.error("Failed to fetch contacts:", error);
        }
      }

      fetchContacts();
    }, []);

    return (
      <table>
        <thead>
          <tr>
            <th colSpan="3">Contact List</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactRow key={contact.id} contact={contact} />
          ))}
        </tbody>
      </table>
    );
  }