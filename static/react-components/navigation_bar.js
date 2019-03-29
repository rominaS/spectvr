'use strict';

const e = React.createElement;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return e(
    <p id="error_box"></p>
    <div class="topnav">
      <a href="/index.html">Upcoming Concerts</a>
      <a href="/about.html">How does this work</a>
      <a
        href="/login.html"
        style="float:right"
        id="signin_btn"
        class="btn head_btn "
        >Sign In / Sign Up</a
      >
      <a
        href="/signout/"
        style="float: right"
        id="signout_btn"
        class="btn head_btn "
        >Sign out</a
      >
    </div>
    );
  }
}

const domContainer = document.querySelector('#navigation');
ReactDOM.render(e(NavBar), domContainer);
