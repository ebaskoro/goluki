/**
 * baseStore.js
 *
 */

import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/appDispatcher';

const EVENT_CHANGE = 'change';

/**
 * Base store.
 *
 */
class BaseStore extends EventEmitter {

  /**
   * Creates a store.
   *
   * @constructs
   */
  constructor() {
    super();
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  /**
   * Adds a change event listener.
   *
   * @param listener Change event listener to add.
   */
  addChangeListener(listener) {
    if (listener) {
      this.on(EVENT_CHANGE, listener);
    }
  }

  /**
   * Removes a change event listener.
   *
   * @param listener Change event listener to remove.
   */
  removeChangeListener(listener) {
    this.removeListener(EVENT_CHANGE, listener);
  }

  /**
   * Emints a change event.
   *
   */
  emitChange() {
    this.emit(EVENT_CHANGE);
  }

  /**
   * Subscribes to dispatcher.
   *
   * @param callback Registration callback to invoke.
   */
  register(callback) {
    this._dispatchToken = AppDispatcher.register(callback);
  }

}

export default BaseStore;
