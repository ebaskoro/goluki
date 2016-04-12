/**
 * initialiseActions.js
 *
 */

import ActionTypes from '../constants/actionTypes';

class InitialiseActions {

  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  /**
   * Initialises the application.
   *
   */
  initApp() {
    this._dispatcher.dispatch({
      actionType: ActionTypes.INITIALISE,
      initialData: {
        orders: []
      }
    });
  }

}

import Dispatcher from '../dispatcher/appDispatcher';
export default new InitialiseActions(Dispatcher);
