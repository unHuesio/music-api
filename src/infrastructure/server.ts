import { app } from './app';

const port: number = 3000

app.listen(port, (): void => {
    console.log(`Example app listening on port ${port}`)
})
