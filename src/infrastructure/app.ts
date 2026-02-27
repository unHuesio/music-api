import express, { Express, Request, Response } from 'express'
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger';
import { productRouter } from '../interfaces'; 
import { errorHandler } from '../interfaces/http/middlewares/errorHandler';

const app: Express = express()

const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200 
}


app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
})); 
app.use(cors(corsOptions));
app.use(express.json()); 

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, '../../public')));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/products', productRouter);

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!')
})

app.use(errorHandler);

export { app };
