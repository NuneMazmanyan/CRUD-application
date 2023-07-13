import express, {Request, Response, Router} from "express";
import {UserController} from "../controllers/user.controller";
import {UserService} from "../services/user.service";

const UserController1 = new UserController(new UserService())

const userRouter: Router = express.Router();

userRouter.get('/users/:userId', UserController1.UserService.authMiddleWare, (req: Request, res: Response) => {
    UserController1.getUser(req, res)
})

userRouter.post('/users', (req: Request, res: Response) => {
    UserController1.createUser(req, res);
})

userRouter.patch('/users/:userId', UserController1.UserService.authMiddleWare, (req: Request, res: Response) => {
    UserController1.updateUser(req, res)
})

userRouter.patch('/users/:userId/status', UserController1.UserService.authMiddleWare, (req: Request, res: Response) => {
    UserController1.activateUser(req, res)
})

userRouter.delete('/users/:userId', UserController1.UserService.authMiddleWare, (req: Request, res: Response) => {
    UserController1.deleteUser(req, res)
})

export default userRouter;