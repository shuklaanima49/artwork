// apps/user-service/src/main.ts
import express from 'express';
import { json } from 'body-parser';
import UserRouter from './routes/user.routes';

const app = express();
const router = new UserRouter();
app.use(json());

app.use(router.getRouter());

app.listen(8990, () => {
  console.log('User Service running on http://localhost:8990');
});
