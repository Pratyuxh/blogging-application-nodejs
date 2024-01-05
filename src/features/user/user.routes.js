// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';

// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post('/register', (req, res)=>{
    userController.register(req, res)
});
userRouter.post('/login', (req, res)=>{
    userController.login(req, res)
});

export default userRouter;
