/**
 * app.js
 *
 */

import React from 'react';
import Header from './common/header';
import Footer from './common/footer';

/**
 * App component.
 *
 */
class App extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <div>
        <Header />
        <div className="container-main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
