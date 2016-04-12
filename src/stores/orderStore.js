/**
 * orderStore.js
 *
 */

import BaseStore from './baseStore';
import ActionTypes from '../constants/actionTypes';
import _ from 'lodash';

/**
 * Order store.
 *
 */
class OrderStore extends BaseStore {

  /**
   * Creates an order store.
   *
   * @constructs
   */
  constructor() {
    super();

    this._orders = [];

    this.register(this.handleAction.bind(this));
  }

  getAllOrders() {
    return this._orders;
  }

  handleAction(action) {
    switch (action.actionType) {
      case ActionTypes.INITIALISE:
        this._orders = action.initialData.orders;
        this.emitChange();
        break;

      case ActionTypes.GET_ORDERS:
        this._orders = action.orders;
        this.emitChange();
        break;

      case ActionTypes.TAKE_ORDER:
        _.remove(this._orders, order => (order.id === action.takenOrder.id));
        this.emitChange();
        break;

      default:
        break;
    }
  }

}

export default new OrderStore();
