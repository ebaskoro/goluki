/**
 * refreshing.js
 *
 */

import React from 'react';
import FontAwesome from 'react-fontawesome';

/**
 * Refreshing component.
 *
 */
class Refreshing extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <div>
        Refreshing <FontAwesome name="spinner" spin size="lg" />
      </div>
    );
  }

}

export default Refreshing;
