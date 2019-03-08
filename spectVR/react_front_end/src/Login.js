import React, { Component } from 'react';
import logo from './logo.svg';
import './form.css';

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

export default Login;
