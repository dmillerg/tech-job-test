export enum TaskState {
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE'
}

export interface Task {
    id: number;
    title: string;
    description: string;
    state: TaskState;
    createdAt: Date;
    createdBy: number;
}