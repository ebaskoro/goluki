/**
 * loggingIn.js
 *
 */

import React from 'react';
import FontAwesome from 'react-fontawesome';

class LoggingIn extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <div>
        Logging in <FontAwesome name="spinner" spin size="lg" />
      </div>
    );
  }

}

export default LoggingIn;
