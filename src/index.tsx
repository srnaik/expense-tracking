import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-expect-error CSS is handled by the bundler and has no TypeScript declarations.
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './SignIn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App/> */}
    <SignIn />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
