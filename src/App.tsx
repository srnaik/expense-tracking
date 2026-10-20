import  {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
          <p> The value is: {firstValue} and it's of type :{typeof firstValue} type!</p>
          <p> The tuple is: {aTuple[0]} and it's of type :{typeof aTuple[0]} type!</p>
            </header>
      </div>
    );
  }
}

export default App;
