import React from 'react'

interface UserContextType {
  userName: string;
  userMessage: string;
}

export const UserContext = React.createContext<UserContextType>({
  userName: '',
  userMessage: ''
});