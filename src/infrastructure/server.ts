import { app } from './app';

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})
