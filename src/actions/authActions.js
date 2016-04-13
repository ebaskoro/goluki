/**
 * authActions.js
 *
 */

import ActionTypes from '../constants/actionTypes';

const RESULT_SUCCESS = 0;
const RESULT_EMAIL_EXISTS = -1;
const RESULT_EMAIL_VERIFIED = -2;
const RESULT_INVALID_CODE = -3;
const RESULT_NOT_FOUND = -4;
const RESULT_INVALID_ACTION = -98;
const RESULT_GENERAL_ERROR = -99;

/**
 * Authorisation actions.
 *
 */
class AuthActions {

  /**
   * Creates authorisation actions.
   *
   * @constructs
   * @param service Driver service to use.
   * @param dispatcher Dispatcher to use.
   */
  constructor(service, dispatcher) {
    this._service = service;
    this._dispatcher = dispatcher;
  }

  /**
   * Registers a new driver.
   *
   * @param {string} email Email address.
   * @param {string} fullName Full name.
   */
  register(email, fullName) {
    this._service.register(email, fullName)
      .then(response => {
        switch (response.resultCode) {
          case RESULT_SUCCESS:
            this._dispatcher.dispatch({
              actionType: ActionTypes.REGISTER,
              isRegistered: true
            });
            break;

          case RESULT_EMAIL_EXISTS:
            this._dispatcher.dispatch({
              actionType: ActionTypes.REGISTER,
              isRegistered: false,
              isEmailTaken: true
            });
            break;

          default:
            this._dispatcher.dispatch({
              actionType: ActionTypes.REGISTER,
              isRegistered: false
            });
            break;
        }
      })
      .fail(() => {
        this._dispatcher.dispatch({
          actionType: ActionTypes.REGISTER,
          isRegistered: false,
          hasError: true
        });
      })
    ;
  }

  /**
   * Verifies an email address.
   *
   * @param {string} email Email address to verify.
   * @param {string} code Verification code.
   */
  verify(email, code) {
    this._service.verify(email, code)
      .then(response => {
        switch(response.resultCode) {
          case RESULT_SUCCESS:
            this._dispatcher.dispatch({
              actionType: ActionTypes.VERIFIED,
              isVerified: true,
              id: parseInt(response.id)
            });
            break;

          case RESULT_EMAIL_VERIFIED:
            this._dispatcher.dispatch({
              actionType: ActionTypes.VERIFIED,
              isVerified: false,
              isAlreadyVerified: true,
            });
            break;

          case RESULT_INVALID_CODE:
            this._dispatcher.dispatch({
              actionType: ActionTypes.VERIFIED,
              isVerified: false,
              isInvalidCode: true
            });
            break;

          default:
            this._dispatcher.dispatch({
              actionType: ActionTypes.VERIFIED,
              isVerified: false
            });
            break;
        }
      })
      .fail(() => {
        this._dispatcher.dispatch({
          actionType: ActionTypes.VERIFIED,
          isVerified: false,
          hasError: true
        });
      })
    ;
  }

  /**
   * Changes password.
   *
   * @param {number} id Driver ID.
   * @param {string} code Verification code.
   * @param {string} password Password.
   */
  changePassword(id, code, password) {
    this._service.changePassword(id, code, password)
      .then(response => {
        switch (response.resultCode) {
          case RESULT_SUCCESS:
            this._dispatcher.dispatch({
              actionType: ActionTypes.CHANGED,
              isChanged: true
            });
            break;

          default:
            this._dispatcher.dispatch({
              actionType: ActionTypes.CHANGED,
              isChanged: false
            });
            break;
        }
      })
      .fail(() => {
        this._dispatcher.dispatch({
          actionType: ActionTypes.CHANGED,
          isChanged: false,
          hasError: true
        });
      })
    ;
  }

  /**
   * Logs in.
   *
   * @param {string} email Email address.
   * @param {string} password Password.
   */
  login(email, password) {
    this._service.login(email, password)
      .then(response => {
        switch (response.resultCode) {
          case RESULT_SUCCESS:
            this._dispatcher.dispatch({
              actionType: ActionTypes.LOG_IN,
              isLoggedIn: true,
              token: response.token,
              expiry: response.expiry
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
          actionType: ActionTypes.LOG_IN,
          isLoggedIn: false,
          hasError: true
        });
      })
    ;
  }

}

import DriverService from '../services/driverService';
import Dispatcher from '../dispatcher/appDispatcher';
export default new AuthActions(DriverService, Dispatcher);
