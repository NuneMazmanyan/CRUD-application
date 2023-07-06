export interface User {
    id: number,
    name: string,
    age: number,
    gender: Gender,
    status: boolean,
    creationTimestamp: Date,
    modificationTimestamp: Date
}

enum Gender{
    Male,
    Female,
    Other
}