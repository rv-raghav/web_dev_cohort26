console.log("This is a TypeScript file!");

function add(a: number, b: number): number {
    return a + b;
}

// add(3,'x'); // This will cause a type error because 'x' is not a number.
const result: number = add(5, 10);
console.log(`The result of adding 5 and 10 is: ${result}`);

// In Memory DB
// 1 {fname, lname, email, contact: {mobile}, address: {street, pin, country}}
// Hashmap (Key, Value)
type UserID = string;

interface User {
    id: UserID;
    fname: string;
    lname?: string;
    email: string;
    contact: {
        mobile: string;
    };
    address: {
        street: string;
        pin: number;
        country: string;
    };
}

class InMemoryDB {
    private _db = new Map<UserID, User>();

    constructor() {

    }

    public insertUser(data: User): UserID{
        if(this._db.has(data.id)){
            throw new Error(`User with id ${data.id} already exists.`);
        }
        this._db.set(data.id, data);
        return data.id;
    }

    public updateUser(id: UserID, updateData: Omit<User, 'id'>) {
        if (!this._db.has(id)) throw new Error(`User with id ${id} does not exist.`);
        this._db.set(id, {...updateData, id});
        return true;
    }
}

const myDb = new InMemoryDB();
myDb.insertUser({
    id: '1',
    fname: 'John',
    lname: 'Doe',
    email: 'john.doe@example.com',
    contact: {
        mobile: '1234567890'
    },
    address: {
        street: '123 Main St',
        pin: 12345,
        country: 'USA'
    }
})