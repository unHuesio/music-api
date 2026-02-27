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

const isOriginAllowed = (origin: string): boolean => {
    return allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin === '*') {
            return true;
        }

        if (!allowedOrigin.includes('*')) {
            return origin === allowedOrigin;
        }

        const escapedPattern = allowedOrigin.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
        const wildcardRegex = new RegExp(`^${escapedPattern}$`);

        return wildcardRegex.test(origin);
    });
};

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            callback(null, true);
            return;
        }

        if (isOriginAllowed(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
})); 
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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
