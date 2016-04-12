/**
 * registerPage.js
 *
 */

import React from 'react';
import AuthStore from '../../stores/authStore';
import { Grid, Row, Col } from 'react-bootstrap';
import Form from './registerForm';

/**
 * Registration component.
 *
 */
class Register extends React.Component {

  /**
   * Creates a registration page.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      isRegistered: false
    };

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
    if (AuthStore.isRegistered) {
      this.setState({
        isRegistered: true
      });
    }
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const isRegistered = this.state.isRegistered;

    if (isRegistered) {
      return (
        <Grid>
          <Row>
            <Col md={12} xs={12}>
              <Registered />
            </Col>
          </Row>
        </Grid>
      );
    }
    else {
      return (
        <Form />
      );
    }
  }

}

export default Register;

/**
 * Registered component.
 *
 */
class Registered extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <p>You have been registered. Please check your email for further instructions.</p>
    );
  }

}
