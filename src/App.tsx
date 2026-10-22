import  {useEffect, useState} from 'react';
import logo from './logo.svg';
// @ts-expect-error TypeScript has no declaration for CSS side-effect imports.
import './App.css';
import Message from './Message';
import React from 'react';


  let firstValue: string = "User";

  const App: React.FC = () => {

    const [userName, setUserName] = useState<string>(firstValue);
    const [userMessage, setUserMessage] = useState<string>("Hello!");

    useEffect(() => {
      const timer = setTimeout(() => {
        updateUser();
      }, 5000);
      return () => clearTimeout(timer);
    }, []);

    const updateUser = () => {
      setUserName("S R Naik");
      setUserMessage("What's up?");
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Message name={userName} message={userMessage} />
          </header>
      </div>
    );
  }

export default App;
