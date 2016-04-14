/**
 * authenticatedComponent.js
 *
 */

import React from 'react';
import AuthStore from '../stores/authStore';
import { hashHistory } from 'react-router';
import toastr from 'toastr';

/**
 * Authenticated component.
 *
 */
class AuthenticatedComponent extends React.Component {

  /**
   * Creates an authenticated component.
   *
   * @constructs
   * @param props Properties.
   * @param state Initial state.
   */
  constructor(props, state) {
    super(props);

    this.state = {
      isLoggedIn: AuthStore.isLoggedIn,
      token: AuthStore.token
    };
    Object.assign(this.state, state);

    this._handleChange = this._handleChange.bind(this);
    AuthStore.addChangeListener(this._handleChange);
  }

  /**
   * Handles component did mount event.
   *
   */
  componentDidMount() {
    if (!this.state.isLoggedIn) {
      hashHistory.push('/login');
    }
  }

  /**
   * Handles component will unmount event.
   *
   */
  componentWillUnmount() {
    AuthStore.removeChangeListener(this._handleChange);
  }

  /**
   * Handles auth store change event.
   *
   */
  _handleChange() {
    this.setState({
      isLoggedIn: AuthStore.isLoggedIn,
      token: AuthStore.token
    });

    toastr.warning('You have been logged out.');

    if (!this.state.isLoggedIn) {
      hashHistory.push('/login');
    }
  }

}

export default AuthenticatedComponent;
