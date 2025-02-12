import { json } from 'body-parser';
import express, { Application } from 'express';
import UserRouter from './routes/user.routes';
import swaggerDocs from './swagger/swagger';
import "reflect-metadata";
import configureEnvironment from './utils/configure-enviroment';
configureEnvironment();
const app:Application = express();
const userRouter = new UserRouter();
const port = 8990;


app.use(json());

app.use('/auth',userRouter.getRouter());

swaggerDocs(app);

app.listen(port, () => {
  console.log('User Service running on http://localhost:8990'); 
});
