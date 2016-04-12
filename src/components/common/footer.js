/**
 * footer.js
 *
 */

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/**
 * Footer component.
 *
 */
class Footer extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <footer>
        <Grid>
          <Row>
            <Col md={3} xs={12}>
              <address>
                <strong>
                  <FontAwesome name="building" /> GOluki
                </strong>
                <br />
                26 Maher Road<br />
                Laverton<br />
                Australia
              </address>
            </Col>
            <Col md={3} xs={12}>
              <h4>Follow Us</h4>
              <p>
                <FontAwesome name="globe" size="lg" /> goluki.imcv.org.au
              </p>
              <p>
                <FontAwesome name="facebook-official" size="lg" /> fb.com/goluki
              </p>
              <p>
                <FontAwesome name="twitter" size="lg" /> twitter.com/goluki
              </p>
            </Col>
            <Col md={3} xs={12}>
              <p className="text-right">
                <FontAwesome name="copyright" /> 2016 GOluki
              </p>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }

}

export default Footer;
