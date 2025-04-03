import express from 'express';
import cors from 'cors'; //Enable Cross origin Resource sharing
import morgan from 'morgan';// Logging
import houseRouter from './routes/houseRoutes.js';
import ownerRouter from './routes/ownerRouter.js';
import quizRouter from './routes/quizRoutes.js';

const app = express();

//Middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))
 

//Routes
app.use('/api/house',houseRouter);
app.use('/api/owner',ownerRouter);
app.use('/api', quizRouter)

export default app;
