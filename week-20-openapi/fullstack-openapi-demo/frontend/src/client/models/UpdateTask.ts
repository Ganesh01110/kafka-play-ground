/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateTask = {
    title?: string;
    description?: string;
    status?: UpdateTask.status;
    priority?: UpdateTask.priority;
};

export namespace UpdateTask {

    export enum status {
        PENDING = 'pending',
        IN_PROGRESS = 'in-progress',
        COMPLETED = 'completed',
    }

    export enum priority {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high',
    }


}
