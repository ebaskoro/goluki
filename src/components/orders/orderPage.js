/**
 * orderPage.js
 *
 */

import React from 'react';
import OrderStore from '../../stores/orderStore';
import OrderPanels from './orderPanels';
import { Grid, Button } from 'react-bootstrap';
import OrderActions from '../../actions/orderActions';
import AuthStore from '../../stores/authStore';
import { hashHistory } from 'react-router';

/**
 * Order page component.
 *
 */
class Order extends React.Component {

  static willTransitionTo(transition) {
    if (!AuthStore.isLoggedIn) {
      transition.redirect('/login');
    }
  }

  /**
   * Creates an order page.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props);

    this.state = {
      orders: OrderStore.getAllOrders(),
      isSearching: false
    };

    this.handleSearch = this.handleSearch.bind(this);

    this.handleChange = this.handleChange.bind(this);
    OrderStore.addChangeListener(this.handleChange);
  }

  /**
   * Handles component will unmount event.
   *
   */
  componentWillUnmount() {
    OrderStore.removeChangeListener(this.handleChange);
  }

  componentDidMount() {
    if (!AuthStore.isLoggedIn) {
      hashHistory.push('/login');
    }
  }

  /**
   * Handles store change event.
   *
   */
  handleChange() {
    this.setState({
      orders: OrderStore.getAllOrders(),
      isSearching: false
    });
  }

  /**
   * Handles search button click event.
   *
   */
  handleSearch() {
    this.setState({
      isSearching: true
    });
    OrderActions.search();
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const isSearching = this.state.isSearching;
    const orders = this.state.orders;

    return (
      <Grid>
        <h2>Orders</h2>
        <p>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={isSearching? null : this.handleSearch}
            disabled={isSearching}>
            {isSearching? <Searching /> : 'Refresh'}
          </Button>
        </p>
        {isSearching? '' : <OrderPanels orders={orders} />}
      </Grid>
    );
  }

}

export default Order;

import FontAwesome from 'react-fontawesome';

/**
 * Searching component.
 *
 */
class Searching extends React.Component {

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
