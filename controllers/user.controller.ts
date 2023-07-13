import {UserService} from "../services/user.service";
import {User} from "../models/models";
import {Request, Response} from 'express';

export class UserController {
    constructor(public UserService: UserService) {}

    getUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;
        try {
            const result = this.UserService.getUser(userId)
            res.status(201).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    createUser(req: Request, res: Response): void {
        const userCredentials: Omit<User, 'id' | 'creationTimestamp' | 'modificationTimestamp' | 'status'> = req.body;
        if (userCredentials.age < 18 || userCredentials.age > 99) {
            res.status(403).send("Your age is not match our requirements")
        }
        try {
            let user = this.UserService.createUser(userCredentials)
            res.status(201).send(`Created Successfully: ${user}`)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    updateUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;
        const userCredentials: Omit<User, 'id' | 'creationTimestamp' | 'modificationTimestamp' | 'status'> = req.body

        try {
            const user = this.UserService.updateUser(userId, userCredentials)
            res.status(201).send(`Updated Successfully: ${user}`)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    activateUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;

        try {
            const user = this.UserService.activateUser(userId);
            res.status(201).send(`Status changed Successfully: ${user}`)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    deleteUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;

        try {
            this.UserService.deleteUser(userId);
            res.status(201).send("Successfully deleted")
        } catch (err) {
            res.status(500).send(err)
        }
    }
}