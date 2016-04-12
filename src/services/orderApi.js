/**
 * orderApi.js
 *
 */

import $ from 'jquery'

const url = 'https://script.google.com/macros/s/AKfycbwC7Iq5pq59-jwgYecpHygr9D9lxO-CS_tCFZ6UCsNH53q5z4dR/exec'

export default {

  /**
   * Gets all pending deliveries.
   *
   * @returns {Promise}
   */
  getAllOrders() {
    return $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'prefix',
      data: {
        action: 'list'
      }
    })
    .promise()
  },

  /**
   * Takes a delivery.
   *
   * @param {number} orderId Order ID.
   * @param {number} driverId Driver ID.
   * @returns {Promise}
   */
  takeOrder(orderId, driverId) {
    return $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'prefix',
      data: {
        action: 'update',
        orderId: orderId,
        driverId: driverId
      }
    })
    .promise()
  }

}
