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
    }
  ]
}; 