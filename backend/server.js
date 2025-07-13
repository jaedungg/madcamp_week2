// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import userRoutes from './routes/user.routes.js';
import comicRoutes from './routes/comic.routes.js';
import movieRoutes from './routes/movie.routes.js';

dotenv.config();
dotenv.config({ path: './.env.local' });

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes);
app.use('/api/comics', comicRoutes);
// app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5050, () => {
      console.log('✅ 서버 실행 중: http://localhost:5050');
      console.log('📘 Swagger 문서: http://localhost:5050/api-docs');
    });
  })
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));
