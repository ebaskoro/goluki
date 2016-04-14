/**
 * authStore.js
 *
 */

import BaseStore from './baseStore';
import ActionTypes from '../constants/actionTypes';

/**
 * Authentication store.
 *
 */
class AuthStore extends BaseStore {

  /**
   * Creates an auth store.
   *
   * @constructs
   */
  constructor() {
    super();

    this._id = 0;
    this._loggedIn = false;
    this._token = null;
    this._expiry = null;
    this._registered = false;
    this._emailTaken = false;
    this._verified = false;
    this._alreadyVerified = false;
    this._invalidCode = false;
    this._passwordChanged = false;

    this.register(this.handleAction.bind(this));
  }

  /**
   * Gets the ID of the currently logged in driver.
   *
   * @returns {number} Driver ID.
   */
  get id() {
    return this._id;
  }

  /**
   * Checks whether the driver is logged in or not.
   *
   * @returns {boolean} True when driver is logged in or false otherwise.
   */
  get isLoggedIn() {
    return this._loggedIn;
  }

  /**
   * Gets the session token.
   *
   * @returns {string} Session token or null if not currently logged in.
   */
  get token() {
    return this._token;
  }

  /**
   * Checks whether the driver has successfully been registered or not.
   *
   * @returns {boolean} True when driver has been registered successfully or false otherwise.
   */
  get isRegistered() {
    return this._registered;
  }

  /**
   * Checks whether the email address has already been taken or not.
   *
   * @returns {boolean} True when email address has been taken or false otherwise.
   */
  get isEmailTaken() {
    return this._emailTaken;
  }

  /**
   * Checks whether the email address has been verified successfully or not.
   *
   * @returns {boolean} True when email address has been verified or false otherwise.
   */
  get isVerified() {
    return this._verified;
  }

  /**
   * Checks whether the email address has already been verified or not.
   *
   * @returns {boolean} True when email address has already been verified or false otherwise.
   */
  get isAlreadyVerified() {
    return this._alreadyVerified;
  }

  /**
   * Checks whether the verification code is invalid or not or not.
   *
   * @returns {boolean} True when verification code is invalid or false otherwise.
   */
  get isInvalidVerificationCode() {
    return this._invalidCode;
  }

  /**
   * Checks whether the password has been changed or not.
   *
   * @returns {boolean} True when password has been changed or false otherwise.
   */
  get isPasswordChanged() {
    return this._passwordChanged;
  }

  /**
   * Handles action event.
   *
   * @param action Action to examine.
   */
  handleAction(action) {
    switch (action.actionType) {
      case ActionTypes.INITIALISE:
        this._loggedIn = false;
        this.emitChange();
        break;

      case ActionTypes.LOG_IN:
        this._loggedIn = action.isLoggedIn;
        this._token = action.token;
        this._expiry = action.expiry;
        this.emitChange();
        break;

      case ActionTypes.REGISTER:
        this._registered = action.isRegistered || false;
        this._emailTaken = action.isEmailTaken || false;
        this.emitChange();
        break;

      case ActionTypes.VERIFIED:
        this._verified = action.isVerified || false;
        this._alreadyVerified = action.isAlreadyVerified || false;
        this._invalidCode = action.isInvalidCode || false;
        this._id = action.id || 0;
        this.emitChange();
        break;

      case ActionTypes.CHANGED:
        this._passwordChanged = action.isChanged || false;
        this.emitChange();
        break;

      default:
        break;
    }
  }

}

export default new AuthStore();
