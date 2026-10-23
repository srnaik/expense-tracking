import React, { useContext } from 'react';
import { UserContext } from './UserContext';


const Message: React.FC = () => {
  const context = useContext(UserContext);

  if(!context) {
    throw new Error('Message component must be used within a UserContext.Provider');
  }

  return (
    <div>
      <p>{context.userName}: {context.userMessage}</p>
    </div>
  );
};

export default Message;