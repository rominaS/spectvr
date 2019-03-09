import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
class Login extends Component {
  render() {
    return (
      <form>
          <input type="text" name="username" placeholder="Enter a username" required/>
          <input type="password" name="password" placeholder="Enter a password" required/>
          <button id="signin" name="action">Sign in</button>
          <button id="signup" name="action">Sign up</button>
        </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      /*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>*/
      <Login />
    );
  }
}
export default App;
