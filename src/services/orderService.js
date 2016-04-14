/**
 * orderApi.js
 *
 */

import $ from 'jquery'

const URL = 'https://script.google.com/macros/s/AKfycbwC7Iq5pq59-jwgYecpHygr9D9lxO-CS_tCFZ6UCsNH53q5z4dR/exec';

/**
 * Order service.
 *
 */
class OrderService {

  /**
   * Gets all pending deliveries.
   *
   * @param {string} token Session token.
   * @returns {Promise}
   */
  getAllOrders(token) {
    return this.createAjax({
      action: 'list',
      token: token
    });
  }

  /**
   * Takes a delivery.
   *
   * @param {number} orderId Order ID.
   * @param {number} driverId Driver ID.
   * @returns {Promise}
   */
  takeOrder(orderId, driverId) {
    return this.createAjax({
      action: 'update',
      token: '',
      orderId: orderId,
      driverId: driverId
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

export default new OrderService();
