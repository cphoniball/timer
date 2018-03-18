import User from 'user/user.interface';

export default interface TimeEntry {
    id: number;
    user: User;
    description: string;
    started_at: string;
    ended_at: string;
}
