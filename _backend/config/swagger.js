const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST API Test',
      version: '1.0.0',
      description: 'REST API Test with express',
    },
    host: 'localhost:3001',
    basePath: '/',
  },
  apis: ['./routes/*.js', './config/*'],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
