import {User} from "../models/models";
import fs from "fs";
import * as path from "path";
import {NextFunction, Request, Response} from "express";

export class UserService{
    users: User[] = [];
    usersDirPath: string =  path.join(__dirname,'..', 'DB', 'users.json')

    constructor() {
        this.getUsers().then((users) => {
            this.users = users || [];
        });
    }

    authMiddleWare(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.get('api-key')

        if (apiKey === 'q48n0v4428n91') {
            next()
        } else {
            res.status(401).send('Invalid Key')
        }
    }

    private writeFile(content: string){
        fs.writeFile(this.usersDirPath, content, (err) => {
            if (err) throw err;
        })
    }

    private async readUsers(){
        let fileContent: User[] = [];
        await fs.readFile(this.usersDirPath, (err, data)=>{
            if (err) throw err;
            fileContent.push(...JSON.parse(data.toString()).users)
        })
        return fileContent;
    }

    private async getUsers(): Promise<User[]>{
        return await this.readUsers();
    }

    private generateUserId(): number{
        let id = Math.floor(Math.random()*100000000)
        if(this.users.find(user => user.id === id)){
            this.generateUserId()
        }
        return id;
    }

    getUser(id: number): User | undefined{
        return this.users.find(user => user.id === id)
    }

    createUser(userCredentials: Omit<User, 'id' | 'creationTimestamp' | 'modificationTimestamp' | 'status'>): User{
        let user: User = {
            ... userCredentials,
            id: this.generateUserId(),
            creationTimestamp: new Date(),
            modificationTimestamp: new Date(),
            status: true
        }

        this.users.push(user)
        this.writeFile(JSON.stringify({users: this.users}))
        return user;

    }

    updateUser(id: number, userCredentials: Omit<User, 'id' | 'creationTimestamp' | 'modificationTimestamp' | 'status'>): User{
        let user: User = this.users.find(user => user.id === id) as User;
        user.name = userCredentials.name;
        user.age = userCredentials.age;
        user.gender = userCredentials.gender;
        user.modificationTimestamp = new Date();

        this.users[this.users.findIndex(user=> user.id === id)] = {
            ...user
        }
        this.writeFile(JSON.stringify({users: this.users}))
        return user as User;
    }

    activateUser(id: number): User{
        let user: User = this.users.find(user => user.id === id) as User;
        user.status = true;
        this.users[this.users.findIndex(user=> user.id === id)] = {
            ...user
        }
        this.writeFile(JSON.stringify({users: this.users}))
        return user;
    }

    deleteUser(id: number): void{
        this.users = this.users.filter(user => user.id !== id)
        this.writeFile(JSON.stringify({users: this.users}))
    }
}
