/**
 * orderList.js
 *
 */

import React from 'react'
import OrderActions from '../../actions/orderActions'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

export default React.createClass({

  propTypes: {
    orders: React.PropTypes.array.isRequired
  },

  /**
   * Renders the component.
   *
   */
  render() {
    if (this.props.orders.length) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Suburb</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(function (order) {
              return <Item key={order.id} order={order} />
            }, this)}
          </tbody>
        </table>
      )
    }
    else {
      return (
        <p>No orders available to be delivered.</p>
      )
    }
  }

})


/**
 * Item component.
 *
 */
let Item = React.createClass({

  propTypes: {
    order: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isTaking: false
    }
  },

  handleSelection(orderToSelect) {
    this.setState({
      isTaking: true
    })
    OrderActions.take(orderToSelect, { id: 0 })
  },

  /**
   * Renders the component.
   *
   */
  render() {
    let order = this.props.order
    let isTaking = this.state.isTaking

    return (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.fullName}</td>
        <td>{order.mobile}</td>
        <td>{order.address}</td>
        <td>{order.suburb}</td>
        <td>
          <Button
            onClick={isTaking? null : () => this.handleSelection(order)}
            disabled={isTaking}>
            {isTaking? <FontAwesome name="spinner" spin /> : 'Take'}
          </Button>
        </td>
      </tr>
    )
  }

})
