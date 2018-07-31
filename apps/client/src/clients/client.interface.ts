import User from 'users/user.interface';

export default interface Client {
    id: number;
    name: string;
    user_id: number;
    user: User;
}
