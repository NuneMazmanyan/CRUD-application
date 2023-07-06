import express, {Request, Response} from "express";
import {UserController} from "../controllers/user.controller";
import {UserService} from "../services/user.service";

export const userController = new UserController(new UserService())

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log('Message sent from port: ', port)
})

app.get('/users/:userId', userController.authMiddleWare, (req: Request, res: Response) => {
    userController.getUser(req, res)
})

app.post('/user', (req: Request, res: Response) => {
    userController.createUser(req, res);
})

app.patch('/users/:userId', userController.authMiddleWare, (req: Request, res: Response) => {
    userController.updateUser(req, res)
})

app.patch('/users/:userId/status', userController.authMiddleWare, (req: Request, res: Response) => {
    userController.toggleUserStatus(req, res)
})

app.delete('/users/:userId', userController.authMiddleWare, (req: Request, res: Response) => {
    userController.deleteUser(req, res)
})

