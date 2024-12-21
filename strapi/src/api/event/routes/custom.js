'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/events/:id/enroll',
      handler: 'api::event.event.enroll',
      config: {
        policies: [],
        middlewares: [],
        auth: {
          required: true
        }
      }
    },
    {
      method: 'PUT',
      path: '/events/:id/cancel-enrollment',
      handler: 'api::event.event.cancelEnrollment',
      config: {
        policies: [],
        middlewares: [],
        auth: {
          required: true
        }
      }
    }
  ]
}; 