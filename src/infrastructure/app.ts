import express, { Express, Request, Response } from 'express'
import helmet from 'helmet';
import path from 'path';
import { productRouter } from '../interfaces'; 

const app: Express = express()

app.use(helmet()); 
app.use(express.json()); 

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, '../../public')));

app.use('/api/products', productRouter);

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!')
})

export { app };
