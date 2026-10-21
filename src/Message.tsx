import React from 'react';

interface userMessage{
  name: string;
  message: string;
}


const Message: React.FC<userMessage> = ({ name, message }) => {
  return (
    <div>
      <p>{name},{message}</p>
    </div>
  );
};

export default Message;