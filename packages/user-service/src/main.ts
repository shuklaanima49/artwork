// apps/user-service/src/main.ts
import express from 'express';
import { json } from 'body-parser';
import { router as userController } from './controllers/user.controller';

const app = express();
app.use(json());

app.use(userController);

app.listen(3000, () => {
  console.log('User Service running on http://localhost:3000');
});
