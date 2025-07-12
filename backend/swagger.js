// backend/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Comic Story API',
      version: '1.0.0',
    },
    servers: [
      { url: 'http://localhost:5050' }
    ],
  },
  apis: ['./routes/*.js'], // JSDoc 주석이 들어간 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
