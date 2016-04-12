/**
 * verifying.js
 *
 */

import React from 'react';
import FontAwesome from 'react-fontawesome';

/**
 * Verifying component.
 *
 */
class Verifying extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <div>
        Verifying <FontAwesome name="spinner" spin size="lg" />
      </div>
    );
  }
}

export default Verifying;
