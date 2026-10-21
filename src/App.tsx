import  {Component} from 'react';
import logo from './logo.svg';
// @ts-expect-error TypeScript has no declaration for CSS side-effect imports.
import './App.css';
import Message from './Message';

class App extends Component {

  render() {

  let firstValue: string = "S R Naik";

  //Tuple
  let aTuple: [string, number] = ['S R Naik', 1];

  //enum
  enum Color {Red, Green, Blue};
  let c: Color = Color.Green;

  //void function

  const display = (): void => {
    console.log("Hello World");
    <p>Hello World!!</p>
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Message name={firstValue} message="What's up?" />
          </header>
      </div>
    );
  }
}

export default App;
