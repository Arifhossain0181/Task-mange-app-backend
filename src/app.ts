// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import taskRoutes from './modules/task.routes.js';
import { globalErrorHandler } from './errors/global.error.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());  

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Tasks Manager App API is running',
  });
});

app.use('/api/tasks', taskRoutes);


app.use(globalErrorHandler);

export default app;
