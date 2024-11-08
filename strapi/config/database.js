const path = require('path');

module.exports = ({ env }) => {

  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'mtob-strapi'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'Amean1415'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      debug: false,
    },
  };
};
