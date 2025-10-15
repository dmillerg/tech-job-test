export enum TaskState {
    PENDING = 'commons.pending',
    COMPLETE = 'commons.complete'
}

export interface Task {
    id: number;
    title: string;
    description: string;
    state: TaskState;
    createdAt: Date;
    createdBy: number;
}