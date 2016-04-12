/**
 * homePage.js
 *
 */

import React from 'react';
import { hashHistory } from 'react-router';
import { Grid, Jumbotron, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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

    this.handleClick = this.handleClick.bind(this);
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
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={this.handleClick}>
              <FontAwesome name="shopping-bag" /> Log In
            </Button>
          </p>
        </Jumbotron>
      </Grid>
    );
  }

}

export default Home;
