/**
 * homePage.js
 *
 */

import React from 'react';
import { hashHistory } from 'react-router';
import { Grid, Jumbotron, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AuthStore from '../stores/authStore';

/**
 * Home component.
 *
 */
class Home extends React.Component {

  /**
   * Creates a home page.
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
   * Handles log in button clicked event.
   *
   */
  handleClick() {
    hashHistory.push('/login')
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <Grid>
        <Jumbotron>
          <h1>Welcome</h1>
          <p>
            You are in control.
          </p>
          <p>
            GO luki is you.
          </p>
          <p>
            {isLoggedIn? '' : (
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleClick}>
                <FontAwesome name="shopping-bag" /> Log In
              </Button>
            )}
          </p>
        </Jumbotron>
      </Grid>
    );
  }

}

export default Home;
