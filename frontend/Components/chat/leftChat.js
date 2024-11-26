import React from 'react';

const contacts = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?' },
  { id: 2, name: 'Jane Smith', lastMessage: 'Are we meeting tomorrow?' },
  // Add more contacts as needed
];

const LeftComponent = ({ onContactClick }) => {
  return (
    <div className="left-component bg-gray-100 p-4 w-1/3">
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-200"
            onClick={() => onContactClick(contact.id)}
          >
            <div className="font-semibold">{contact.name}</div>
            <div className="text-sm text-gray-600">{contact.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftComponent;
