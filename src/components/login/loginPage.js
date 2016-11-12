/**
 * loginPage.js
 *
 */

import React from 'react';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import LoggingIn from './loggingIn';
import AuthStore from '../../stores/authStore';
import AuthActions from '../../actions/authActions';
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
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
    this.setState({
      isLoggingIn: false
    });

    if (AuthStore.isLoggedIn) {
      hashHistory.push('/');
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
   * Handles key press event.
   *
   * @param event Key press event.
   */
  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleLogin(event);
    }
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
    const isLoggingIn = this.state.isLoggingIn;

    return (
      <Grid>
        <Row>
          <Col md={12} xs={12}>
            <h2>Log In</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Input
              type="text"
              value={this.state.email}
              onChange={this.handleEmail}
              onKeyPress={this.handleKeyPress}
              placeholder=""
              label="Email Address"
              bsSize="large"
              bsStyle={this.state.validEmail? null : 'error'}
              disabled={isLoggingIn}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Input
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
              onKeyPress={this.handleKeyPress}
              placeholder=""
              label="Password"
              bsSize="large"
              bsStyle={this.state.validPassword? null : 'error'}
              disabled={isLoggingIn}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={isLoggingIn? null : this.handleLogin}
              disabled={isLoggingIn}>
              {isLoggingIn? <LoggingIn /> : 'Log In'}
            </Button>
            &nbsp;
            {isLoggingIn? '' : (
              <Button
                bsStyle="link"
                bsSize="large"
                onClick={isLoggingIn? null : this.handleRegister}
                disabled={isLoggingIn}>
                register
              </Button>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default Login;
