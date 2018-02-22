import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles/NavBar.css';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar__container">
        <div className="navbar__logo--container">
          <h1 className="navbar__logo--text"><Link to="/">Loco</Link></h1>
          {this.props.loggedIn ?
            <button className="navbar__button" onClick={this.props.logOut}>Log Out</button> :
            <Link className="navbar__button" to="/login">Log In</Link>}
        </div>
      </div>
    );
  }
}


/*
{this.props.logged ? <button className="navbar-button" onClick={this.props.onLogout}>Logout</button> :
<a className="navbar-button" href="/login">Login</a>}
*/