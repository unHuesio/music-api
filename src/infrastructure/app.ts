import express, { Express, Request, Response } from 'express'
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger';
import { productRouter } from '../interfaces'; 

const app: Express = express()

app.use(helmet()); 
app.use(express.json()); 

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, '../../public')));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/products', productRouter);

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!')
})

export { app };
