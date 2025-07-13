// backend/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Comic Story API',
      version: '1.0.0',
      description: 'API documentation with JWT authentication support',
    },
    servers: [
      { url: 'http://localhost:5050' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {               // JWT 인증 스키마 추가
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],            // 전역 적용
      },
    ],
  },
  apis: ['./routes/*.js'], // JSDoc 주석이 들어간 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
