import * as express from 'express';
import { httpCreateUser, httpGetUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/login', httpGetUser);
userRouter.post('/signup', httpCreateUser);

export default userRouter;