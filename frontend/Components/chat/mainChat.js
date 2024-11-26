import React, { useState } from 'react';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';

const ChatApp = () => {
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleContactClick = (contactId) => {
    setSelectedContactId(contactId);
  };

  return (
    <div className="chat-app flex h-screen">
      <LeftComponent onContactClick={handleContactClick} />
      <RightComponent contactId={selectedContactId} />
    </div>
  );
};

export default ChatApp;
