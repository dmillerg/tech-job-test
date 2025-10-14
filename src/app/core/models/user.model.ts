export interface User {
    id: number;
    email: string;
    name: string;
    avatar?: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
    active?: boolean;
    phone?: string;
    description?: string;
    lastLogin?: Date;
}