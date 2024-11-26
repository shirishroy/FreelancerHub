import React, { useEffect, useState } from 'react';

// Mock data for chat messages
const chatMessages = {
  1: [
    { id: 1, sender: 'John Doe', text: 'Hey, how are you?' },
    { id: 2, sender: 'You', text: 'I am good, thanks! How about you?' },
  ],
  2: [
    { id: 1, sender: 'Jane Smith', text: 'Are we meeting tomorrow?' },
    { id: 2, sender: 'You', text: 'Yes, see you at 10 AM!' },
  ],
  // Add more conversations as needed
};

const RightComponent = ({ contactId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (contactId) {
      setMessages(chatMessages[contactId] || []);
    }
  }, [contactId]);

  if (!contactId) {
    return <div className="right-component flex-1 p-4">Select a contact to start chatting</div>;
  }

  return (
    <div className="right-component flex-1 p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="messages mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message p-2 mb-2 rounded ${
              message.sender === 'You' ? 'bg-blue-200 self-end' : 'bg-gray-200'
            }`}
          >
            <strong>{message.sender}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="message-input mt-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default RightComponent;
