import {UserService} from "../services/user.service";
import {User} from "../models/models";
import {NextFunction, Request, Response} from 'express';

export class UserController {
    constructor(private UserService: UserService) {
    }

    authMiddleWare(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.get('api-key')

        if (apiKey === 'q48n0v4428n91') {
            next()
        } else {
            res.status(401).send('Invalid Key')
        }
    }

    getUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;
        try {
            const result = this.UserService.getUser(userId)
            res.status(201).send(result)
        } catch (err) {
            console.log(err)
        }
    }

    createUser(req: Request, res: Response): void {
        const userCredentials: Omit<User, 'id' | 'creationTimestamp' | 'modificationTimestamp' | 'status'> = req.body;
        if (userCredentials.age < 18 || userCredentials.age > 99) {
            console.error('Your age is not match our requirements')
        }
        try {
            let user = this.UserService.createUser(userCredentials)
            res.status(201).send(`Created Successfully: ${user}`)
        } catch (err) {
            console.log(err)
        }
    }

    updateUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;
        const userCredentials: Omit<User, 'id' | 'creationTimestamp' | 'modificationTimestamp' | 'status'> = req.body

        try {
            const user = this.UserService.updateUser(userId, userCredentials)
            res.status(201).send(`Updated Successfully: ${user}`)
        } catch (err) {
            console.log(err)
        }
    }

    toggleUserStatus(req: Request, res: Response): void {
        const userId: number = +req.params.userId;

        try {
            const user = this.UserService.toggleUserStatus(userId);
            res.status(201).send(`Status changed Successfully: ${user}`)
        } catch (err) {
            console.log(err)
        }
    }

    deleteUser(req: Request, res: Response): void {
        const userId: number = +req.params.userId;

        try {
            this.UserService.deleteUser(userId);
            res.status(201).send("Successfully deleted")
        } catch (err) {
            console.log(err)
        }
    }
}