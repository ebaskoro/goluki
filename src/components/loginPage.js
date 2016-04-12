/**
 * loginPage.js
 *
 */

import React from 'react';
import AuthStore from '../stores/authStore';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import AuthActions from '../actions/authActions';
import { hashHistory } from 'react-router';
import toastr from 'toastr';

/**
 * Login component.
 *
 */
class Login extends React.Component {

  /**
   * Creates a login.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validEmail: true,
      password: '',
      validPassword: true,
      isLoggingIn: false
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

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
    if (AuthStore.isLoggedIn) {
      //
    }
    else {
      toastr.error('Incorrect email address and/or password.');
    }
  }

  /**
   * Handles email changed event.
   *
   * @param event Change event.
   */
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  /**
   * Handles password changed event.
   *
   * @param event Change event.
   */
  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  /**
   * Handles login button clicked event.
   *
   */
  handleLogin() {
    let errorMessages = [];

    const email = this.state.email;

    if (email) {
      this.setState({
        validEmail: true
      });
    }
    else {
      this.setState({
        validEmail: false
      });
      errorMessages.push('Email address must be specified');
    }

    const password = this.state.password;

    if (password) {
      this.setState({
        validPassword: true
      });
    }
    else {
      this.setState({
        validPassword: false
      });
      errorMessages.push('Password must be specified');
    }

    if (errorMessages.length) {
      const message = errorMessages.join(', ');
      toastr.error(message);
    }
    else {
      this.setState({
        isLoggingIn: true
      });
      AuthActions.login(email, password);
    }
  }

  /**
   * Handles register button clicked event.
   *
   */
  handleRegister() {
    hashHistory.push('/register');
  }

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} xs={12}>
            <Input
              type="text"
              value={this.state.email}
              onChange={this.handleEmail}
              placeholder="enter your email address"
              label="Email Address"
              bsSize="large"
              bsStyle={this.state.validEmail? null : 'error'}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Input
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder="enter your password"
              label="Password"
              bsSize="large"
              bsStyle={this.state.validPassword? null : 'error'}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={this.handleLogin}>
              Log In
            </Button>
            &nbsp;
            <Button
              bsSize="large"
              onClick={this.handleRegister}>
              Register
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default Login;
