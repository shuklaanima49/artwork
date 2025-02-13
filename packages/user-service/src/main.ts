import { json } from 'body-parser';
import express, { Application } from 'express';
import UserRouter from './routes/user.routes';
import swaggerDocs from './swagger/swagger';
import "reflect-metadata";
import configureEnvironment from './utils/configure-enviroment';
import RolesRouter from './routes/roles.routes';
configureEnvironment();
const app:Application = express();
const userRouter = new UserRouter();
const rolesRouter = new RolesRouter();
const port = 8990;


app.use(json());
app.use((req,res,next)=>{
  console.log(req.originalUrl);
  next();
});
app.use('/auth',userRouter.getRouter());
app.use('/admin',rolesRouter.getRouter());

swaggerDocs(app);

app.listen(port, () => {
  console.log('User Service running on http://localhost:8990'); 
});
