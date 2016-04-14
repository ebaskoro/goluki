/**
 * orderPage.js
 *
 */

import React from 'react';
import AuthenticatedComponent from '../authenticatedComponent';
import { Grid, Button } from 'react-bootstrap';
import Refreshing from './refreshing';
import OrderStore from '../../stores/orderStore';
import OrderPanels from './orderPanels';
import OrderActions from '../../actions/orderActions';

/**
 * Order page component.
 *
 */
class Order extends AuthenticatedComponent {

  /**
   * Creates an order page.
   *
   * @constructs
   * @param props Properties.
   */
  constructor(props) {
    super(props, {
      orders: [],
      isRefreshing: false
    });

    this.handleSearch = this.handleSearch.bind(this);

    this.handleChange = this.handleChange.bind(this);
    OrderStore.addChangeListener(this.handleChange);
  }

  /**
   * Handles component will unmount event.
   *
   */
  componentWillUnmount() {
    super.componentWillUnmount();

    OrderStore.removeChangeListener(this.handleChange);
  }

  /**
   * Handles store change event.
   *
   */
  handleChange() {
    this.setState({
      orders: OrderStore.getAllOrders(),
      isRefreshing: false
    });
  }

  /**
   * Handles search button click event.
   *
   */
  handleSearch() {
    this.setState({
      isRefreshing: true
    });
    OrderActions.search(this.state.token);
  }

  /**
   * Renders the component.
   *
   */
  render() {
    const isRefreshing = this.state.isRefreshing;
    const orders = this.state.orders;

    return (
      <Grid>
        <h2>Orders</h2>
        <p>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={isRefreshing? null : this.handleSearch}
            disabled={isRefreshing}>
            {isRefreshing? <Refreshing /> : 'Refresh'}
          </Button>
        </p>
        {isRefreshing? '' : <OrderPanels orders={orders} />}
      </Grid>
    );
  }

}

export default Order;
