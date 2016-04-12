/**
 * changePassword.js
 *
 */

import React from 'react';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import Changing from './changing';
import AuthStore from '../../stores/authStore';
import AuthActions from '../../actions/authActions';
import toastr from 'toastr';

/**
 * Change password component.
 *
 */
class ChangePassword extends React.Component {

  static PropTypes = {
    id: React.PropTypes.number.isRequired
  }

  /**
   * Creates a change password.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      password: '',
      validPassword: true,
      isChanging: false
    };

    this.handlePassword = this.handlePassword.bind(this);
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
    if (AuthStore.isPasswordChanged) {
      // Do nothing further
    }
    else {
      toastr.error('Unable to change password.');
    }

    this.setState({
      isChanging: false
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
   * Handles button clicked event.
   *
   */
  handleClick() {
    let errorMessages = [];

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
        isChanging: true
      });
      const id = this.state.id;
      AuthActions.changePassword(id, password);
    }
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const isChanging = this.state.isChanging;

    return (
      <Grid>
        <Row>
          <Col md={8} xs={12}>
            <Input
              type="text"
              value={this.state.password}
              onChange={this.handlePassword}
              label="New Password"
              bsSize="large"
              bsStyle={this.state.validPassword? null : 'error'}
              disabled={isChanging}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={isChanging? null : this.handleClick}
              disabled={isChanging}>
              {isChanging? <Changing /> : 'Change'}
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default ChangePassword;
