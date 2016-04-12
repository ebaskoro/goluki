/**
 * orderActions.js
 *
 */

import Dispatcher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/actionTypes'
import OrderApi from '../services/orderApi'

export default {

  /**
   * Searches for all orders.
   *
   */
  search() {
    OrderApi.getAllOrders().then(function (response) {
      if (response.resultCode === 0) {
        Dispatcher.dispatch({
          actionType: ActionTypes.GET_ORDERS,
          orders: response.deliveries
        })
      }
    })
  },

  /**
   * Takes an order.
   *
   * @param order Order to take.
   * @param driver Driver taking the order.
   */
  take(order, driver) {
    OrderApi.takeOrder(order.id, driver.id).then(function (response) {
      if (response.resultCode === 0) {
        Dispatcher.dispatch({
          actionType: ActionTypes.TAKE_ORDER,
          takenOrder: order
        })
      }
    })
  }

}
