/**
 * orderPanels.js
 *
 */

import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';

/**
 * Orders panel component.
 *
 */
class OrderPanels extends React.Component {

  static propTypes = {
    orders: React.PropTypes.array.isRequired
  }

  /**
   * Cretes an orders panel.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const orders = this.props.orders;

    if (orders.length) {
      return (
        <Row>
          {orders.map((order) => <Item key={order.id} order={order} />, this)}
        </Row>
      )
    }
    else {
      return (
        <p>No orders available to be delivered.</p>
      )
    }
  }

}

export default OrderPanels;

import OrderActions from '../../actions/orderActions';

/**
 * Item component.
 *
 */
class Item extends React.Component {

  static propTypes = {
    order: React.PropTypes.object.isRequired
  }

  /**
   * Creates an item.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      isTaking: false
    };
  }

  /**
   * Handles order selection.
   *
   * @param orderToSelect Order to select.
   */
  handleSelection(orderToSelect) {
    this.setState({
      isTaking: true
    });
    OrderActions.take(orderToSelect, { id: 0 });
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const order = this.props.order;
    const isTaking = this.state.isTaking;

    return (
      <Col md={4} xs={12}>
        <Panel header={order.id}>
          <h3>{order.fullName}</h3>
          <p>Mobile: {order.mobile}</p>
          <p>{order.address}</p>
          <p>{order.suburb}</p>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={isTaking? null : () => this.handleSelection(order)}
            disabled={isTaking}>
            {isTaking? <Processing /> : 'Take'}
          </Button>
        </Panel>
      </Col>
    );
  }

}

import FontAwesome from 'react-fontawesome';

/**
 * Processing component.
 *
 */
class Processing extends React.Component {

  /**
   * Renders the component.
   *
   */
  render() {
    return (
      <div>
        Processing <FontAwesome name="spinner" spin size="lg" />
      </div>
    )
  }

}
