/**
 * header.js
 *
 */

import React from 'react';
import { Navbar, fixedTop, Nav, NavItem } from 'react-bootstrap';
import { Link, hashHistory } from 'react-router';
import AuthStore from '../../stores/authStore';

/**
 * Header component.
 *
 */
class Header extends React.Component {

  /**
   * Creates a header.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: AuthStore.isLoggedIn
    };

    this.handleClick = this.handleClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    AuthStore.addChangeListener(this.handleChange);
  }

  /**
   * Handles component will unmount event.
   *
   */
  componentWillUnmount() {
    AuthStore.removeChangeListener(this.handleChange);
  }

  /**
   * Handles store change event.
   *
   */
  handleChange() {
    this.setState({
      isLoggedIn: AuthStore.isLoggedIn
    });
  }

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
    const isLoggedIn = this.state.isLoggedIn;

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
          {isLoggedIn? (
            <Nav>
              <NavItem onClick={isLoggedIn? this.handleClick : null}>
                Orders
              </NavItem>
            </Nav>
          ) : ''}
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

export default Header;
