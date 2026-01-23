/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Task = {
    /**
     * Unique task identifier
     */
    id: string;
    /**
     * Task title
     */
    title: string;
    /**
     * Task description
     */
    description?: string;
    /**
     * Current task status
     */
    status: Task.status;
    /**
     * Task priority level
     */
    priority: Task.priority;
    /**
     * Task creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

export namespace Task {

    /**
     * Current task status
     */
    export enum status {
        PENDING = 'pending',
        IN_PROGRESS = 'in-progress',
        COMPLETED = 'completed',
    }

    /**
     * Task priority level
     */
    export enum priority {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high',
    }


}
