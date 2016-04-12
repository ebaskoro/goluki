/**
 * header.js
 *
 */

import React from 'react';
import { Navbar, fixedTop, Nav, NavItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';

/**
 * Header component.
 *
 */
class Header extends React.Component {

  /**
   * Handles orders link clicked event.
   *
   */
  handleClick() {
    hashHistory.push('/orders');
  }

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            <Link to="/">
              <img src="images/logo.jpg" />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={this.handleClick.bind(this)}>
              Orders
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default Header;
