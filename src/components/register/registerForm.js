/**
 * registerPage.js
 *
 */

import React from 'react';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import Registering from './registering';
import AuthStore from '../../stores/authStore';
import AuthActions from '../../actions/authActions';
import toastr from 'toastr';

/**
 * Registration form component.
 *
 */
class Form extends React.Component {

  /**
   * Creates a registration form.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      validFullName: true,
      email: '',
      validEmail: true,
      isRegistering: false
    };

    this.handleFullName = this.handleFullName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);

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
   * Handles change event.
   *
   */
  handleChange() {
    console.log('registerForm.handleChange')
    if (AuthStore.isRegistered) {
      // Do nothing special
    }
    else if (AuthStore.isEmailTaken) {
      toastr.warning('Email address has already been used for registration before.');
    }
    else {
      toastr.error('Unable to register.');
    }

    this.setState({
      isRegistering: false
    });
  }

  /**
   * Handles full name changed event.
   *
   * @param event Change event.
   */
  handleFullName(event) {
    this.setState({
      fullName: event.target.value
    });
  }

  /**
   * Handles email address changed event.
   *
   * @param event Change event.
   */
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  /**
   * Handles register button clicked event.
   *
   * @param event Click event.
   */
  handleClick(event) {
    event.preventDefault();

    let errorMessages = [];

    const fullName = this.state.fullName;

    if (fullName) {
      this.setState({
        validFullName: true
      });
    }
    else {
      this.setState({
        validFullName: false
      });
      errorMessages.push('Full name must be specified');
    }

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

    if (errorMessages.length) {
      const message = errorMessages.join(', ');
      toastr.error(message);
    }
    else {
      this.setState({
        isRegistering: true
      });
      AuthActions.register(email, fullName);
    }
  }

  /**
   * Handles reset button clicked event.
   *
   */
  handleReset() {
    this.setState({
      fullName: '',
      email: ''
    });
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const isRegistering = this.state.isRegistering;

    return (
      <Grid>
        <Row>
          <Col md={12} xs={12}>
            <h2>Registration</h2>
          </Col>
        </Row>
        <Row>
          <Col md={8} xs={12}>
            <Input
              type="text"
              value={this.state.fullName}
              onChange={this.handleFullName}
              placeholder=""
              label="Full Name"
              bsSize="large"
              bsStyle={this.state.validFullName? null : 'error'}
              disabled={isRegistering}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8} xs={12}>
            <Input
              type="text"
              value={this.state.email}
              onChange={this.handleEmail}
              placeholder=""
              label="Email Address"
              bsSize="large"
              bsStyle={this.state.validEmail? null : 'error'}
              disabled={isRegistering}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={isRegistering? null : this.handleClick}
              disabled={isRegistering}>
              {isRegistering? <Registering /> : 'Register'}
            </Button>
            <Button
              bsStyle="link"
              bsSize="large"
              onClick={isRegistering? null : this.handleReset}
              disabled={isRegistering}>
              reset
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default Form;
