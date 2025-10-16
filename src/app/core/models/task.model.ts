export enum TaskState {
    PENDING = 'commons.pending',
    COMPLETE = 'commons.complete'
}

export enum TaskPriority {
    LOW = 'commons.low',
    MIDDLE = 'commons.middle',
    HIGH = 'commons.high',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    state: TaskState;
    createdAt: Date;
    createdBy: string;
    priority: TaskPriority;
    note: string;
}