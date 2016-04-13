/**
 * driverApi.js
 *
 */

import $ from 'jquery';

const URL = 'https://script.google.com/macros/s/AKfycbwG55bxYEJNrDzo3Snxe1CFTADWMAwhu1NDqbQhs5OtT2KmVrTj/exec';

/**
 * Driver service.
 *
 */
class DriverService {

  /**
   * Registers a new driver.
   *
   * @param {string} email Email address.
   * @param {string} fullName Full name.
   * @returns {Promise}
   */
  register(email, fullName) {
    return this.createAjax({
      action: 'register',
      emailAddress: email,
      fullName: fullName
    });
  }

  /**
   * Verifies an email given a verification code.
   *
   * @param {string} email Email address to verify.
   * @param {string} code Verification code to use.
   * @returns {Promise}
   */
  verify(email, code) {
    return this.createAjax({
      action: 'verify',
      emailAddress: email,
      verificationCode: code
    });
  }

  /**
   * Changes password.
   *
   * @param {number} id Driver ID.
   * @param {string} code Verification code.
   * @param {string} password New password to set.
   * @returns {Promise}
   */
  changePassword(id, code, password) {
    return this.createAjax({
      action: 'changePassword',
      id: id,
      verificationCode: code,
      newPassword: password
    });
  }

  /**
   * Logs in.
   *
   * @param {string} email Email address.
   * @param {string} password Password.
   * @returns {Promise}
   */
  login(email, password) {
    return this.createAjax({
      action: 'login',
      emailAddress: email,
      password: password
    });
  }

  /**
   * Creates Ajax request.
   *
   * @param data Request data to send.
   * @returns {Promise}
   */
  createAjax(data) {
    return $.ajax({
      url: URL,
      dataType: 'jsonp',
      jsonp: 'prefix',
      data: data
    })
    .promise();
  }

}

export default new DriverService();
