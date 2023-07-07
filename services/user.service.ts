import {User} from "../models/models";
import fs from "fs";
import * as path from "path";

export class UserService{
    users: User[] = [];
    usersDirPath: string =  path.join(__dirname,'..', 'DB', 'users.json')

    constructor() {
        this.users = this.getUsers() || [];
    }

    private getUsers(): User[]{
        let usersJsonData = fs.readFileSync(this.usersDirPath).toString()
        return JSON.parse(usersJsonData).users;
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
        fs.writeFileSync(this.usersDirPath, JSON.stringify({users: this.users}))
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
        fs.writeFileSync(this.usersDirPath, JSON.stringify({users: this.users}))
        return user as User;
    }

    toggleUserStatus(id: number): User{
        let user: User = this.users.find(user => user.id === id) as User;
        user.status = !user.status;
        this.users[this.users.findIndex(user=> user.id === id)] = {
            ...user
        }
        fs.writeFileSync(this.usersDirPath, JSON.stringify({users: this.users}));
        return user;
    }

    deleteUser(id: number): void{
        this.users = this.users.filter(user => user.id !== id)
        fs.writeFileSync(this.usersDirPath, JSON.stringify({users: this.users}))
    }
}
