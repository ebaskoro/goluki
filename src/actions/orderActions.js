/**
 * orderActions.js
 *
 */

import ActionTypes from '../constants/actionTypes';

const RESULT_SUCCESS = 0;
const RESULT_NOT_FOUND = -4;
const RESULT_INVALID_ACTION = -98;
const RESULT_GENERAL_ERROR = -99;

/**
 * Order actions.
 *
 */
class OrderActions {

  /**
   * Creates order actions.
   *
   * @constructs
   * @param service Order service to use.
   * @param dispatcher Dispatcher to use.
   */
  constructor(service, dispatcher) {
    this._service = service;
    this._dispatcher = dispatcher;
  }

  /**
   * Searches for all orders.
   *
   * @param {string} token Session token to use.
   */
  search(token) {
    this._service.getAllOrders(token)
      .then(response => {
        switch (response.resultCode) {
          case RESULT_SUCCESS:
            this._dispatcher.dispatch({
              actionType: ActionTypes.GET_ORDERS,
              orders: response.deliveries
            });
            break;

          default:
            this._dispatcher.dispatch({
              actionType: ActionTypes.LOG_IN,
              isLoggedIn: false
            });
            break;
        }
      })
      .fail(() => {
        this._dispatcher.dispatch({
          actionType: ActionTypes.GET_ORDERS,
          hasError: true
        });
      })
    ;
  }

  /**
   * Takes an order.
   *
   * @param order Order to take.
   * @param driver Driver taking the order.
   */
  take(order, driver) {
    this._service.takeOrder(order.id, driver.id)
      .then(response => {
        switch (response.resultCode) {
          default:
            this._dispatcher.dispatch({
              actionType: ActionTypes.TAKE_ORDER,
              takenOrder: order
            });
            break;
        }
      })
    ;
  }

}

import OrderService from '../services/orderService';
import Dispatcher from '../dispatcher/appDispatcher';
export default new OrderActions(OrderService, Dispatcher);
