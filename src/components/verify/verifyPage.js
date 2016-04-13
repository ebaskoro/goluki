/**
 * verifyPage.js
 *
 */

import React from 'react';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import Verifying from './verifying';
import ChangePassword from './changePassword';
import AuthStore from '../../stores/authStore';
import AuthActions from '../../actions/authActions';
import toastr from 'toastr';

/**
 * Verification component.
 *
 */
class Verify extends React.Component {

  /**
   * Creates a verification page.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      email: this.props.location.query.email,
      validEmail: true,
      code: this.props.location.query.code,
      validCode: true,
      isVerifying: false,
      isVerified: false,
      isComplete: false
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleCode = this.handleCode.bind(this);
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
   * Handles change event.
   *
   */
  handleChange() {
    if (AuthStore.isPasswordChanged) {
      this.setState({
        isComplete: true
      });
    }
    else if (AuthStore.isVerified) {
      this.setState({
        isVerified: true,
        id: AuthStore.id
      });
    }
    else if (AuthStore.isAlreadyVerified) {
      toastr.warning('Email address has already been verified.');
    }
    else if (AuthStore.isInvalidVerificationCode) {
      toastr.error('Incorrect email address and/or verification code.');
    }
    else {
      toastr.error('Unable to verify the email address.');
    }

    this.setState({
      isVerifying: false
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
   * Handles verification code changed event.
   *
   * @param event Change event.
   */
  handleCode(event) {
    this.setState({
      code: event.target.value
    });
  }

  /**
   * Handles verify button clicked event.
   *
   */
  handleClick() {
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

    const code = this.state.code;

    if (code) {
      this.setState({
        validCode: true
      });
    }
    else {
      this.setState({
        validCode: false
      });
      errorMessages.push('Verification code must be specified');
    }

    if (errorMessages.length) {
      const message = errorMessages.join(', ');
      toastr.error(message);
    }
    else {
      this.setState({
        isVerifying: true
      });
      AuthActions.verify(email, code);
    }
  }

  /**
   * Renders the component.
   *
   */
  render() {
    if (this.state.isComplete) {
      return (
        <Grid>
        <Row>
          <Col md={12} xs={12}>
            <p>Congratulations! Your password has been set. The next step is to wait for your account to be approved.</p>
          </Col>
        </Row>
        </Grid>
      );
    }
    else if (this.state.isVerified) {
      return (
        <Grid>
          <Row>
            <Col md={12} xs={12}>
              <p>Congratulations! Your email address is now verified. To continue with the registration please set your password below:</p>
            </Col>
          </Row>
          <ChangePassword
            id={this.state.id}
            code={this.state.code}
          />
        </Grid>
      )
    }
    else {
      const isVerifying = this.state.isVerifying;

      return (
        <Grid>
          <Row>
            <Col md={12} xs={12}>
              <h2>Verify Email Address</h2>
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
                disabled={isVerifying}
              />
            </Col>
          </Row>
          <Row>
            <Col md={8} xs={12}>
              <Input
                type="text"
                value={this.state.code}
                onChange={this.handleCode}
                placeholder=""
                label="Verification Code"
                bsSize="large"
                bsStyle={this.state.validCode? null : 'error'}
                disabled={isVerifying}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={isVerifying? null : this.handleClick}
                disabled={isVerifying}>
                {isVerifying? <Verifying /> : 'Verify'}
              </Button>
            </Col>
          </Row>
        </Grid>
      );
    }
  }

}

export default Verify;
