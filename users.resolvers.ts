import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { UserInput, User } from './users.schema';

@Resolver(() => User)
export class UserResolver {
    private users: User[] = [
        { id: 1, name: 'nabi', email: "nabi@gmail.com"},
        { id: 2, name: 'Alex', email: "Alex@gmail.com"},
        { id: 3, name: 'Brucly', email: "Brucly@gmail.com"},
        { id: 4, name: 'Bro', email: "Bro@gmail.com"},
        { id: 5, name: 'Alexender', email: "Alexender@gmail.com"}
    ];


@Query(() => [User])
async getUsers(): Promise<User[]> {
    return this.users;
}

@Query(() => User)
async getUser(@Arg ('id') id:number): Promise<User | undefined> {
    const user =  this.users.find(user => user.id === id);
    return user;
}

@Mutation(()=> User)
async createUser(@Arg('input') input: UserInput): Promise<User> {
    const user ={
        id: this.users.length + 1,
        ...input,
    }
    this.users.push(user);
    return user;
}

@Mutation(() => User)
async updateUser(
    @Arg('id') id: number,
    @Arg('input') input: UserInput):
    Promise<User> {
        const user = this.users.find(u => u.id === id);

        if(!user){ throw new Error('User not found');
        }
        const updatedUser = {
            ...user,
            ...input,
        }
        
        this.users = this.users.map(u => u.id === id ? updatedUser : u);
        
        return updatedUser;
    }
}



